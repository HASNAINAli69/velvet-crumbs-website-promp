import { useState } from 'react';
import { Cake, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer
      style={{ background: 'linear-gradient(135deg, #3E2010, #5A2D0C)' }}
      aria-label="Velvet Crumbs footer"
    >
      {/* Newsletter */}
      <div className="border-b border-amber-800/50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-1">
                Stay in the loop 🍰
              </h3>
              <p className="text-amber-300/80 text-sm">
                Subscribe for new flavours, seasonal specials, and exclusive offers.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 w-full md:w-auto"
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-required="true"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-amber-900/60 border border-amber-700/50 text-white placeholder-amber-400/70 focus:border-amber-400 focus:bg-amber-900/80 text-sm"
              />
              <button
                type="submit"
                className="btn-ripple px-4 py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                aria-label="Subscribe to newsletter"
              >
                {subscribed ? '✓' : <ArrowRight size={18} aria-hidden="true" />}
              </button>
            </form>
          </div>
          {subscribed && (
            <p className="text-green-400 text-sm mt-3" role="status" aria-live="polite">
              🎉 You're subscribed! Welcome to the Velvet Crumbs family.
            </p>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
                <Cake size={20} className="text-white" aria-hidden="true" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Velvet <span className="text-amber-400">Crumbs</span>
              </span>
            </div>
            <p className="text-amber-300/70 text-sm leading-relaxed">
              Handcrafted luxury cakes made with love. Creating edible art for your most precious celebrations since 2019.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation: Quick links">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2" role="list">
              {[
                ['Home', '#home'],
                ['Our Cakes', '#products'],
                ['Custom Cakes', '#custom'],
                ['About Us', '#about'],
                ['Reviews', '#reviews'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-amber-300/70 hover:text-amber-300 text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Footer navigation: Legal pages">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2" role="list">
              {[
                ['Privacy Policy', '/privacy-policy'],
                ['Terms & Conditions', '/terms'],
                ['Cookie Policy', '/cookie-policy'],
                ['Refund Policy', '/refund-policy'],
                ['Accessibility', '#accessibility'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-amber-300/70 hover:text-amber-300 text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact info */}
          <address className="not-italic">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-amber-300/70" role="list">
              <li>📍 12 Gulberg Main Blvd, Lahore</li>
              <li>
                <a href="tel:+923001234567" className="hover:text-amber-300 transition-colors">
                  📞 +92 300 123 4567
                </a>
              </li>
              <li>
                <a href="mailto:hello@velvetcrumbs.pk" className="hover:text-amber-300 transition-colors">
                  ✉️ hello@velvetcrumbs.pk
                </a>
              </li>
              <li>🕘 Mon–Sat: 9AM–9PM</li>
              <li>🕙 Sun: 10AM–7PM</li>
            </ul>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-amber-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-amber-400/60 text-xs">
            © 2024 Velvet Crumbs. All rights reserved.
          </p>
          <p className="text-amber-400/60 text-xs">
            Made with ❤️ in Lahore · Prices in PKR
          </p>
          <p className="text-amber-400/60 text-xs">
            *Free delivery on orders over PKR 5,000
          </p>
        </div>
      </div>
    </footer>
  );
}
