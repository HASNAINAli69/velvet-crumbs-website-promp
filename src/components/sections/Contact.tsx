import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

// Social icon SVGs
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', consent: false });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    if (!form.consent) e.consent = 'Please accept to continue';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSent(true);
    setErrors({});
    setTimeout(() => setSent(false), 5000);
  };

  const set = (field: string, val: string | boolean) =>
    setForm(p => ({ ...p, [field]: val }));

  return (
    <section id="contact" className="py-20 px-4" aria-label="Contact Velvet Crumbs">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">Get in Touch</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-amber-900 mb-4">
            Let's <span className="shimmer-text">Connect</span>
          </h2>
          <p className="text-amber-700/70 max-w-xl mx-auto">
            Have a question? Want to place an order or discuss a custom creation? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            {/* Contact cards */}
            {[
              { icon: Phone, label: 'Phone', value: '+92 300 123 4567', href: 'tel:+923001234567', aria: 'Call us' },
              { icon: Mail, label: 'Email', value: 'hello@velvetcrumbs.pk', href: 'mailto:hello@velvetcrumbs.pk', aria: 'Email us' },
              { icon: MapPin, label: 'Location', value: '12 Gulberg Main Blvd, Lahore, Pakistan', href: '#', aria: 'View on map' },
              { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9AM–9PM · Sun: 10AM–7PM', href: null, aria: 'Opening hours' },
            ].map(item => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-amber-800 font-medium hover:text-amber-600 transition-colors"
                      aria-label={item.aria}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-amber-800 font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="rounded-3xl overflow-hidden h-48 relative"
              role="img"
              aria-label="Map showing Velvet Crumbs location at 12 Gulberg Main Blvd, Lahore"
              style={{
                background: 'linear-gradient(135deg, #E8F4F8, #D4E9E2)',
                border: '2px solid rgba(201,168,76,0.2)',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <MapPin size={36} className="text-amber-500" aria-hidden="true" />
                <p className="font-semibold text-amber-800">Velvet Crumbs Bakery</p>
                <p className="text-amber-600 text-sm">12 Gulberg Main Blvd, Lahore</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
                  aria-label="Open Velvet Crumbs location in Google Maps (opens in new tab)"
                >
                  Open in Maps
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-sm font-semibold text-amber-700 mb-3">Follow Us</p>
              <div className="flex gap-3" role="list" aria-label="Social media links">
                {[
                  { icon: InstagramIcon, label: 'Instagram', href: '#', color: 'hover:bg-pink-500' },
                  { icon: FacebookIcon, label: 'Facebook', href: '#', color: 'hover:bg-blue-600' },
                  { icon: YoutubeIcon, label: 'YouTube', href: '#', color: 'hover:bg-red-600' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    role="listitem"
                    className={`w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 hover:text-white ${s.color} transition-all hover:scale-110`}
                    aria-label={`Follow Velvet Crumbs on ${s.label} (opens in new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <s.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 rounded-3xl"
            noValidate
            aria-label="Contact form"
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(201,168,76,0.25)',
              boxShadow: '0 8px 40px rgba(125,75,42,0.10)',
            }}
          >
            <h3 className="font-display text-xl font-bold text-amber-900 mb-4">Send a Message</h3>

            {[
              { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Ayesha Khan', required: true },
              { id: 'email', label: 'Email Address', type: 'email', placeholder: 'hello@example.com', required: true },
              { id: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+92 300 000 0000', required: false },
            ].map(field => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-semibold text-amber-800 mb-1">
                  {field.label} {field.required && <span className="text-amber-500" aria-hidden="true">*</span>}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  value={(form as any)[field.id]}
                  onChange={e => set(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  aria-required={field.required}
                  aria-invalid={!!errors[field.id]}
                  aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 text-amber-800 placeholder-amber-300 transition-all ${
                    errors[field.id] ? 'border-red-400' : 'border-amber-200 focus:border-amber-400'
                  }`}
                />
                {errors[field.id] && (
                  <p id={`${field.id}-error`} className="text-red-500 text-xs mt-1" role="alert">{errors[field.id]}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-amber-800 mb-1">
                Message <span className="text-amber-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={e => set('message', e.target.value)}
                placeholder="Tell us about your cake, event date, or any questions…"
                required
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white/80 text-amber-800 placeholder-amber-300 resize-none transition-all ${
                  errors.message ? 'border-red-400' : 'border-amber-200 focus:border-amber-400'
                }`}
              />
              {errors.message && (
                <p id="message-error" className="text-red-500 text-xs mt-1" role="alert">{errors.message}</p>
              )}
            </div>

            {/* Consent */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  id="contact-consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={e => set('consent', e.target.checked)}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.consent}
                  className="mt-1 w-4 h-4 rounded border-amber-300 accent-amber-500 flex-shrink-0"
                />
                <label htmlFor="contact-consent" className="text-xs text-amber-600 leading-relaxed">
                  I agree to the{' '}
                  <a href="/privacy-policy" className="underline hover:text-amber-800" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                  {' '}and consent to Velvet Crumbs processing my data to respond to my enquiry. Only necessary data is collected.
                </label>
              </div>
              {errors.consent && (
                <p className="text-red-500 text-xs mt-1" role="alert">{errors.consent}</p>
              )}
            </div>

            <button
              type="submit"
              className={`btn-ripple w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                sent
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-xl hover:scale-[1.01] shadow-lg'
              }`}
              aria-live="polite"
            >
              <Send size={18} aria-hidden="true" />
              {sent ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
