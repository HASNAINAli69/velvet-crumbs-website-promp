import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vc-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('vc-cookie-consent', 'all');
    setVisible(false);
  };

  const necessary = () => {
    localStorage.setItem('vc-cookie-consent', 'necessary');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-describedby="cookie-description"
      className="cookie-banner"
    >
      <div
        className="m-4 sm:m-6 rounded-3xl p-5 sm:p-6 max-w-2xl mx-auto"
        style={{
          background: 'rgba(62, 32, 16, 0.97)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(201,168,76,0.3)',
          boxShadow: '0 -10px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Cookie size={22} className="text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-display text-white font-bold text-base mb-1">We use cookies</h3>
              <p id="cookie-description" className="text-amber-300/80 text-sm leading-relaxed">
                We use only <strong className="text-amber-300">necessary cookies</strong> to make our website work. No tracking cookies or third-party analytics are used without your explicit consent. See our{' '}
                <a href="/cookie-policy" className="underline text-amber-400 hover:text-amber-300">Cookie Policy</a> for details.
              </p>

              {showDetails && (
                <div className="mt-3 p-3 rounded-xl bg-amber-900/50 border border-amber-700/40 text-xs text-amber-300/80 space-y-1.5">
                  <p><strong className="text-amber-300">Necessary (always on):</strong> Session cookies for cart and form functionality. No personal data stored without consent.</p>
                  <p><strong className="text-amber-300">Analytics (optional):</strong> We do not use any analytics tracking by default.</p>
                  <p><strong className="text-amber-300">Third-party:</strong> No third-party embeds that set cookies are used.</p>
                </div>
              )}

              <button
                onClick={() => setShowDetails(d => !d)}
                className="text-amber-400 text-xs underline mt-2 hover:text-amber-300 transition-colors"
                aria-expanded={showDetails}
              >
                {showDetails ? 'Hide details' : 'Learn more'}
              </button>
            </div>
          </div>
          <button
            onClick={necessary}
            className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-800/60 flex items-center justify-center hover:bg-amber-700/60 transition-colors"
            aria-label="Dismiss cookie banner"
          >
            <X size={14} className="text-amber-300" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            onClick={necessary}
            className="btn-ripple flex-1 py-2.5 rounded-xl border border-amber-600/50 text-amber-300 text-sm font-medium hover:bg-amber-800/50 transition-colors"
          >
            Necessary Only
          </button>
          <button
            onClick={accept}
            className="btn-ripple flex-1 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-400 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
