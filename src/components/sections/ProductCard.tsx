import { useState, useRef, useCallback } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { wishlist, toggleWishlist } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isWished = wishlist.includes(product.id);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 14;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const delay = `${index * 80}ms`;

  return (
    <>
      <article
        ref={cardRef}
        className="section-reveal visible group relative rounded-3xl overflow-hidden cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 4px 24px rgba(125,75,42,0.08)',
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease, box-shadow 0.3s ease',
          animationDelay: delay,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={`${product.name}, PKR ${product.price.toLocaleString()}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-52 sm:h-56">
          <img
            src={product.image}
            alt={product.alt}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 img-lazy ${imgLoaded ? 'loaded' : ''}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-lg">
              {product.badge}
            </span>
          )}

          {/* Wishlist button */}
          <button
            onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isWished
                ? 'bg-pink-500 scale-110'
                : 'bg-white/80 hover:bg-pink-50 hover:scale-110'
            }`}
            aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={isWished}
          >
            <Heart
              size={16}
              className={isWished ? 'text-white fill-white' : 'text-pink-400'}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1" aria-label={`Rated ${product.rating} out of 5 stars, ${product.reviews} reviews`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                aria-hidden="true"
              />
            ))}
            <span className="text-xs text-amber-600 ml-1">({product.reviews})</span>
          </div>

          <h3 className="font-display font-semibold text-amber-900 text-base leading-tight mb-1">
            {product.name}
          </h3>
          <p className="text-amber-700/70 text-xs line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="font-bold text-amber-800 text-base">PKR {product.price.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-ripple flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={14} aria-hidden="true" />
              Add to Cart
            </button>
          </div>
        </div>
      </article>

      {modalOpen && (
        <ProductModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
