import { useEffect, useRef, useState } from 'react';
import { Award, Heart, Clock, Star } from 'lucide-react';

const stats = [
  { icon: Clock, value: 5, suffix: '+', label: 'Years Baking', color: 'text-amber-500' },
  { icon: Heart, value: 10000, suffix: '+', label: 'Happy Customers', color: 'text-pink-500' },
  { icon: Award, value: 50, suffix: '+', label: 'Cake Designs', color: 'text-amber-600' },
  { icon: Star, value: 4.9, suffix: '★', label: 'Average Rating', color: 'text-amber-400' },
];

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal
        ? Math.round(target * eased * 10) / 10
        : Math.floor(target > 1000 ? target * eased : target * eased);
      setCount(current);
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>
      {target >= 1000 ? (count / 1000).toFixed(count >= 1000 ? 0 : 1) + 'K' : count.toString()}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); el.classList.add('visible'); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 section-reveal"
      aria-label="About Velvet Crumbs"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden h-48 shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/30667454/pexels-photo-30667454.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                    alt="Velvet Crumbs bakery display with fresh pastries and cakes"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden h-32 shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/18462789/pexels-photo-18462789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Selection of beautifully decorated cakes in our bakery case"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="rounded-3xl overflow-hidden h-32 shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/5964615/pexels-photo-5964615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Artisan cupcakes being prepared on a wooden board"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden h-48 shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/29380150/pexels-photo-29380150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                    alt="Charming Velvet Crumbs bakery display of fresh bread and pastries"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Floating award badge */}
            <div
              className="absolute -bottom-6 -right-6 glass px-5 py-4 rounded-2xl shadow-2xl border border-amber-200 animate-float"
              style={{ animationDuration: '6s' }}
              aria-label="Award: Best Artisan Bakery 2024"
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl" aria-hidden="true">🏆</span>
                <div>
                  <p className="font-bold text-amber-900 text-sm">Best Artisan</p>
                  <p className="text-amber-600 text-xs">Bakery 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-amber-900 mb-6">
              Baked From the{' '}
              <span className="shimmer-text">Heart</span>
            </h2>
            <p className="text-amber-700/80 text-lg leading-relaxed mb-4">
              Velvet Crumbs was born from a simple belief: that every celebration deserves a cake as extraordinary as the moment itself. Founded in the heart of Lahore, we have been crafting edible art for over five years.
            </p>
            <p className="text-amber-700/70 leading-relaxed mb-8">
              We use only the finest quality ingredients — sourced locally where possible — and pair them with creative designs inspired by our customers' dreams. From intimate birthday cakes to grand wedding centrepieces, every creation tells a story.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { emoji: '🌿', title: 'Quality Ingredients', desc: 'Locally sourced, fresh daily' },
                { emoji: '🎨', title: 'Creative Designs', desc: 'Unique, bespoke for you' },
                { emoji: '❤️', title: 'Made with Love', desc: 'Every cake is personal' },
                { emoji: '🚀', title: 'Timely Delivery', desc: 'Fresh, on time, always' },
              ].map(v => (
                <div
                  key={v.title}
                  className="p-4 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <span className="text-2xl mb-1 block" aria-hidden="true">{v.emoji}</span>
                  <p className="font-semibold text-amber-900 text-sm">{v.title}</p>
                  <p className="text-amber-600/70 text-xs">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4" aria-label="Velvet Crumbs statistics">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <stat.icon size={20} className={`${stat.color} mx-auto mb-1`} aria-hidden="true" />
                  <div className={`font-display text-2xl font-bold ${stat.color}`} aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                  </div>
                  <p className="text-amber-700/60 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
