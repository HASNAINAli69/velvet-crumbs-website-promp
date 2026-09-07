import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/products';

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="py-20 px-4 overflow-hidden" aria-label="Customer reviews">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">What People Say</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-amber-900 mb-4">
            Sweet <span className="shimmer-text">Stories</span>
          </h2>
          <p className="text-amber-700/70 max-w-xl mx-auto">
            Over 10,000 happy customers can't be wrong. Read what our beloved community says about their Velvet Crumbs experience.
          </p>
        </div>

        {/* Stars average */}
        <div className="flex flex-col items-center mb-10" aria-label="Overall rating: 4.9 out of 5 stars">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={28} className="text-amber-400 fill-amber-400" aria-hidden="true" />
            ))}
          </div>
          <p className="font-display text-5xl font-bold text-amber-700">4.9<span className="text-2xl text-amber-400">/5</span></p>
          <p className="text-amber-600/70 text-sm mt-1">Based on 10,000+ reviews</p>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors"
            aria-label="Scroll reviews left"
          >
            <ChevronLeft size={20} className="text-amber-700" aria-hidden="true" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors"
            aria-label="Scroll reviews right"
          >
            <ChevronRight size={20} className="text-amber-700" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
          role="list"
          aria-label="Customer testimonials"
        >
          {[...testimonials, ...testimonials.slice(0, 2)].map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              role="listitem"
              className="flex-shrink-0 w-80 snap-start rounded-3xl p-6"
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(14px)',
                border: '1.5px solid rgba(255,255,255,0.5)',
                boxShadow: '0 4px 30px rgba(125,75,42,0.08)',
              }}
              aria-label={`Review by ${t.name}`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote>
                <p className="text-amber-800/80 text-sm leading-relaxed mb-5 italic">
                  "{t.review}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${t.color} flex-shrink-0`}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <cite className="font-semibold text-amber-900 text-sm not-italic">{t.name}</cite>
                  <p className="text-amber-500 text-xs">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
