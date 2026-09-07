import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

const floatingElements = [
  { emoji: '🍓', top: '15%', left: '8%', delay: '0s', duration: '6s', size: 'text-2xl' },
  { emoji: '🍫', top: '20%', right: '10%', delay: '1s', duration: '7s', size: 'text-xl' },
  { emoji: '✨', top: '60%', left: '5%', delay: '0.5s', duration: '5s', size: 'text-lg' },
  { emoji: '🎂', top: '75%', right: '8%', delay: '2s', duration: '8s', size: 'text-2xl' },
  { emoji: '🌸', top: '35%', left: '3%', delay: '1.5s', duration: '6.5s', size: 'text-xl' },
  { emoji: '⭐', top: '50%', right: '4%', delay: '0.8s', duration: '5.5s', size: 'text-lg' },
  { emoji: '🧁', top: '85%', left: '12%', delay: '2.5s', duration: '7s', size: 'text-xl' },
  { emoji: '🍰', top: '10%', right: '20%', delay: '1.2s', duration: '6.5s', size: 'text-lg' },
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMouse);
    return () => el?.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FDF6EC 0%, #F9D5E5 40%, #FDF6EC 70%, #FFF8F0 100%)',
      }}
    >
      {/* Animated gradient blobs */}
      <div
        className="absolute top-20 left-1/4 w-80 h-80 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #F0D080, #E8A4C0)',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.5s ease',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C9A84C, #E8A4C0)',
          transform: `translate(${-mousePos.x * 15}px, ${-mousePos.y * 15}px)`,
          transition: 'transform 0.5s ease',
        }}
        aria-hidden="true"
      />

      {/* Floating Elements */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className={`absolute ${el.size} animate-float select-none pointer-events-none`}
          style={{
            top: el.top,
            left: 'left' in el ? el.left : undefined,
            right: 'right' in el ? el.right : undefined,
            animationDelay: el.delay,
            animationDuration: el.duration,
          }}
          aria-hidden="true"
        >
          {el.emoji}
        </div>
      ))}

      {/* Sparkle dots */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`spark-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 animate-sparkle pointer-events-none"
          style={{
            top: `${10 + i * 7}%`,
            left: `${15 + ((i * 37) % 70)}%`,
            animationDelay: `${i * 0.3}s`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center py-24">
        {/* Text */}
        <div className="text-center lg:text-left">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-200 text-amber-700 text-sm font-medium mb-6 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles size={14} aria-hidden="true" />
            Premium Handcrafted Bakery
          </div>

          <h1
            className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-amber-900">Velvet</span>{' '}
            <span className="shimmer-text">Crumbs</span>
          </h1>

          <p
            className={`font-display text-2xl sm:text-3xl text-amber-800 italic mb-4 transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Made With Love.
            <br />
            <span className="text-pink-500">Baked To Make You Smile.</span>
          </p>

          <p
            className={`text-amber-700/80 text-lg max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Artisan cakes crafted from the finest ingredients, designed to make your moments unforgettable. From bespoke wedding cakes to indulgent brownies — every creation is a masterpiece.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-400 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="#products"
              className="btn-ripple inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-lg shadow-lg shadow-amber-300/50 hover:shadow-amber-400/60 hover:scale-105 transition-all duration-300"
            >
              Order Now
              <ArrowRight size={20} aria-hidden="true" />
            </a>
            <a
              href="#products"
              className="btn-ripple inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass border-2 border-amber-300 text-amber-800 font-semibold text-lg hover:bg-amber-50 hover:scale-105 transition-all duration-300"
            >
              Explore Cakes
            </a>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-wrap gap-8 justify-center lg:justify-start mt-12 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {[
              { value: '5+', label: 'Years Baking' },
              { value: '10K+', label: 'Happy Customers' },
              { value: '50+', label: 'Cake Designs' },
              { value: '4.9★', label: 'Rating' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-amber-600">{stat.value}</div>
                <div className="text-amber-800/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div
          className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div
            className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px] animate-float"
            style={{ animationDuration: '7s' }}
          >
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{
                background: 'radial-gradient(circle, #F0D080, #E8A4C0, transparent)',
                transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
                transition: 'transform 0.3s ease',
              }}
              aria-hidden="true"
            />
            {/* Image container */}
            <div
              className="relative w-full h-full rounded-[40%] overflow-hidden shadow-2xl border-4 border-white/50"
              style={{
                transform: `perspective(800px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                src="https://images.pexels.com/photos/30873493/pexels-photo-30873493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Elegant gold and white anniversary cake — our signature creation at Velvet Crumbs"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" aria-hidden="true" />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -top-4 -right-4 glass px-4 py-2 rounded-2xl shadow-xl border border-amber-200 animate-float-reverse"
              aria-label="5 star rating"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500 text-lg" aria-hidden="true">⭐</span>
                <span className="font-bold text-amber-900">4.9/5</span>
              </div>
              <p className="text-xs text-amber-700">10K+ Reviews</p>
            </div>

            <div
              className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-2xl shadow-xl border border-pink-200 animate-float"
              style={{ animationDelay: '1s' }}
              aria-label="Fresh daily baked goods"
            >
              <span className="text-2xl" aria-hidden="true">🎂</span>
              <p className="text-xs font-semibold text-amber-900">Fresh Daily</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#products"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-600 hover:text-amber-800 transition-colors animate-bounce"
        aria-label="Scroll to products"
      >
        <span className="text-xs font-medium">Explore</span>
        <ChevronDown size={20} aria-hidden="true" />
      </a>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#FDF6EC"
            opacity="0.7"
          />
        </svg>
      </div>
    </section>
  );
}
