import { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || '');
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const isWished = wishlist.includes(product.id);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedFlavor, message, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[9800] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
        style={{ backdropFilter: 'blur(4px)' }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'rgba(253,246,236,0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(201,168,76,0.3)',
          boxShadow: '0 30px 80px rgba(125,75,42,0.25)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-amber-50 transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X size={20} className="text-amber-700" aria-hidden="true" />
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-3xl">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" aria-hidden="true" />
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold bg-amber-500 text-white">
              {product.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 id="modal-title" className="font-display text-2xl font-bold text-amber-900">
              {product.name}
            </h2>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isWished ? 'bg-pink-500' : 'bg-amber-100 hover:bg-pink-50'
              }`}
              aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={isWished}
            >
              <Heart size={18} className={isWished ? 'text-white fill-white' : 'text-pink-400'} aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3" aria-label={`${product.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} aria-hidden="true" />
            ))}
            <span className="text-amber-600 text-sm">({product.reviews} reviews)</span>
          </div>

          <p className="text-amber-700/80 mb-4 leading-relaxed">{product.description}</p>

          <div className="text-2xl font-bold text-amber-700 mb-5">
            PKR {(product.price * quantity).toLocaleString()}
          </div>

          {/* Size */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-amber-800 mb-2">Size</label>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Select size">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                      selectedSize === size
                        ? 'border-amber-500 bg-amber-500 text-white'
                        : 'border-amber-200 text-amber-700 hover:border-amber-400'
                    }`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flavor */}
          {product.flavors && product.flavors.length > 0 && (
            <div className="mb-4">
              <label htmlFor="flavor-select" className="block text-sm font-semibold text-amber-800 mb-2">Flavor</label>
              <select
                id="flavor-select"
                value={selectedFlavor}
                onChange={e => setSelectedFlavor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-200 bg-white/80 text-amber-800 text-sm font-medium focus:border-amber-400"
                aria-label="Select flavor"
              >
                {product.flavors.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          )}

          {/* Custom message */}
          <div className="mb-4">
            <label htmlFor="cake-message" className="block text-sm font-semibold text-amber-800 mb-2">
              Custom Message on Cake <span className="font-normal text-amber-600">(optional)</span>
            </label>
            <input
              id="cake-message"
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="e.g. Happy Birthday Ayesha! 🎉"
              maxLength={50}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-200 bg-white/80 text-amber-800 text-sm placeholder-amber-300 focus:border-amber-400"
              aria-describedby="message-hint"
            />
            <p id="message-hint" className="text-xs text-amber-500 mt-1">{message.length}/50 characters</p>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-amber-800 mb-2">Quantity</label>
            <div className="flex items-center gap-3" role="group" aria-label="Quantity selector">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-colors"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <Minus size={16} className="text-amber-700" aria-hidden="true" />
              </button>
              <span className="w-10 text-center font-bold text-amber-900 text-lg" aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} className="text-amber-700" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className={`btn-ripple w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white scale-[0.98]'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-xl hover:scale-[1.02] shadow-lg shadow-amber-300/40'
            }`}
            aria-live="polite"
          >
            <ShoppingCart size={20} aria-hidden="true" />
            {added ? '✓ Added to Cart!' : `Add to Cart — PKR ${(product.price * quantity).toLocaleString()}`}
          </button>
        </div>
      </div>
    </div>
  );
}
