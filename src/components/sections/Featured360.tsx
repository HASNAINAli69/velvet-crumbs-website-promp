import { useState, useRef, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import { products } from '../../data/products';
import ProductModal from './ProductModal';

const featuredProducts = products.filter(p => p.featured);

export default function Featured360() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [_inertia, setInertia] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const product = featuredProducts[selectedIdx];

  const applyInertia = useCallback(() => {
    setInertia(prev => {
      if (Math.abs(prev) < 0.3) return 0;
      const next = prev * 0.95;
      setRotation(r => r + next);
      animRef.current = requestAnimationFrame(applyInertia);
      return next;
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    cancelAnimationFrame(animRef.current);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation(r => r + delta * 0.5);
    setInertia(delta * 0.3);
    setStartX(e.clientX);
  }, [isDragging, startX]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    animRef.current = requestAnimationFrame(applyInertia);
  }, [applyInertia]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    setRotation(r => r + delta * 0.5);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => setIsDragging(false);

  const normalizedRot = ((rotation % 360) + 360) % 360;
  const shadowOffset = Math.sin((normalizedRot * Math.PI) / 180) * 20;
  const scaleY = 0.85 + 0.1 * Math.abs(Math.cos((normalizedRot * Math.PI) / 180));

  return (
    <section className="py-20 px-4 overflow-hidden" aria-label="Featured cakes showcase">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">Interactive Showcase</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-amber-900 mb-4">
            360° <span className="shimmer-text">View</span>
          </h2>
          <p className="text-amber-700/70 max-w-xl mx-auto">
            Drag to rotate and explore our signature cakes from every angle. Experience the craftsmanship up close.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer */}
          <div className="flex flex-col items-center">
            {/* 360 badge */}
            <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
              <RotateCcw size={16} className={isDragging ? 'animate-spin' : ''} aria-hidden="true" />
              360° View — Drag to Rotate
            </div>

            {/* Viewer */}
            <div
              ref={containerRef}
              className="relative w-72 h-72 sm:w-80 sm:h-80 cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              role="img"
              aria-label={`360 degree view of ${product?.name}. Drag to rotate.`}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full opacity-30 blur-3xl"
                style={{ background: 'radial-gradient(circle, #F0D080, #E8A4C0)' }}
                aria-hidden="true"
              />

              {/* Image */}
              {product && (
                <div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    boxShadow: `${shadowOffset}px 20px 60px rgba(125,75,42,0.3), 0 0 0 4px rgba(201,168,76,0.3)`,
                    transform: `perspective(600px) rotateY(${normalizedRot * 0.1}deg) scaleY(${scaleY})`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease',
                  }}
                >
                  <img
                    src={product.image}
                    alt={`360 degree view: ${product.alt}`}
                    className="w-full h-full object-cover"
                    style={{
                      transform: `scaleX(${normalizedRot > 180 ? -1 : 1}) rotateY(${normalizedRot * 0.05}deg)`,
                    }}
                    draggable="false"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${90 + normalizedRot * 0.5}deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Degree indicator */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-center">
                <div className="px-3 py-1 rounded-full bg-white/80 border border-amber-200 text-amber-700 text-xs font-mono shadow-md">
                  {Math.round(normalizedRot)}°
                </div>
              </div>
            </div>

            <p className="mt-10 text-amber-600/60 text-xs text-center">
              ← Drag left or right to rotate →
            </p>
          </div>

          {/* Product Details */}
          {product && (
            <div>
              {/* Selector tabs */}
              <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Featured products">
                {featuredProducts.map((p, i) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={i === selectedIdx}
                    onClick={() => { setSelectedIdx(i); setRotation(0); }}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                      i === selectedIdx
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    {p.name.split(' ').slice(0, 2).join(' ')}
                  </button>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-xs font-semibold mb-3">
                ✨ Featured
              </div>

              <h3 className="font-display text-3xl font-bold text-amber-900 mb-3">
                {product.name}
              </h3>

              <p className="text-amber-700/80 text-base leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Flavor chips */}
              {product.flavors && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.flavors.map(f => (
                    <span key={f} className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm">
                      {f}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <span className="font-bold text-3xl text-amber-700">PKR {product.price.toLocaleString()}</span>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-sm font-bold">{product.badge}</span>
                )}
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="btn-ripple px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg shadow-lg shadow-amber-300/40 hover:shadow-amber-400/60 hover:scale-105 transition-all duration-300"
                aria-label={`Order ${product.name}`}
              >
                Order Now
              </button>
            </div>
          )}
        </div>
      </div>

      {modalOpen && product && (
        <ProductModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
}
