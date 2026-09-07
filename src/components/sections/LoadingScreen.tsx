import { useEffect, useState } from 'react';
import { Cake } from 'lucide-react';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #3E2010, #7D4B2A)' }}
      role="status"
      aria-label="Loading Velvet Crumbs website"
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 flex items-center justify-center border-2 border-amber-400/40 animate-pulse">
          <Cake size={40} className="text-amber-400" aria-hidden="true" />
        </div>
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-1">
            Velvet <span className="text-amber-400">Crumbs</span>
          </h1>
          <p className="text-amber-300/70 text-sm">Premium Artisan Bakery</p>
        </div>
      </div>

      {/* Progress */}
      <div className="w-48">
        <div className="w-full h-1 rounded-full bg-amber-900/60 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(to right, #C9A84C, #F0D080)',
            }}
            aria-hidden="true"
          />
        </div>
        <p className="text-center text-amber-400/60 text-xs mt-2" aria-live="polite">
          {Math.round(Math.min(progress, 100))}%
        </p>
      </div>

      {/* Floating emojis */}
      {['🎂', '🧁', '🍫', '🍓', '✨', '🌸'].map((e, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-float opacity-30 select-none"
          style={{
            top: `${10 + i * 12}%`,
            left: `${5 + (i * 17) % 90}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${4 + i * 0.5}s`,
          }}
          aria-hidden="true"
        >
          {e}
        </div>
      ))}
    </div>
  );
}
