import { useState } from 'react';
import { Palette, Upload, CheckCircle } from 'lucide-react';

const flavors = ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon', 'Strawberry', 'Caramel', 'Almond'];
const sizes = ['6" (6–8 people)', '8" (10–14 people)', '10" (16–20 people)', '12" (24–30 people)', 'Two-tier', 'Three-tier'];
const frostings = ['Buttercream', 'Cream Cheese', 'Whipped Cream', 'Ganache', 'Fondant', 'Mirror Glaze'];
const themes = ['Floral', 'Minimalist', 'Rustic', 'Glam & Gold', 'Pastel Dream', 'Dark Romance', 'Tropical', 'Custom'];
const decorations = ['Fresh Flowers', 'Macarons', 'Edible Gold', 'Sugar Art', 'Sprinkles', 'Fruit', 'Candles'];

const basePrice = 3500;
const priceMap: Record<string, number> = {
  '6" (6–8 people)': 0, '8" (10–14 people)': 1500, '10" (16–20 people)': 3000,
  '12" (24–30 people)': 5000, 'Two-tier': 8000, 'Three-tier': 14000,
  'Fondant': 800, 'Mirror Glaze': 600, 'Ganache': 400,
  'Edible Gold': 1200, 'Sugar Art': 1500, 'Macarons': 800, 'Fresh Flowers': 600,
};

export default function CustomCake() {
  const [form, setForm] = useState({
    flavor: 'Vanilla', size: '8" (10–14 people)', frosting: 'Buttercream',
    theme: 'Floral', decorations: [] as string[], message: '', color: '#F9D5E5',
  });
  const [submitted, setSubmitted] = useState(false);

  const estimatedPrice = basePrice
    + (priceMap[form.size] || 0)
    + (priceMap[form.frosting] || 0)
    + form.decorations.reduce((sum, d) => sum + (priceMap[d] || 500), 0);

  const toggleDecoration = (d: string) => {
    setForm(prev => ({
      ...prev,
      decorations: prev.decorations.includes(d)
        ? prev.decorations.filter(x => x !== d)
        : [...prev.decorations, d],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="custom" className="py-20 px-4" aria-label="Design your custom cake">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">Bespoke Creations</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-amber-900 mb-4">
            Design Your <span className="shimmer-text">Dream Cake</span>
          </h2>
          <p className="text-amber-700/70 max-w-xl mx-auto">
            Tell us your vision and we will craft something extraordinary. Every custom cake is a unique masterpiece created just for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Custom cake order form"
            noValidate
          >
            {/* Flavor */}
            <fieldset>
              <legend className="block text-sm font-semibold text-amber-800 mb-2">Cake Flavor</legend>
              <div className="flex flex-wrap gap-2">
                {flavors.map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, flavor: f }))}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      form.flavor === f
                        ? 'border-amber-500 bg-amber-500 text-white'
                        : 'border-amber-200 text-amber-700 hover:border-amber-400 bg-white/60'
                    }`}
                    aria-pressed={form.flavor === f}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Size */}
            <div>
              <label htmlFor="cake-size" className="block text-sm font-semibold text-amber-800 mb-2">Cake Size</label>
              <select
                id="cake-size"
                value={form.size}
                onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-white/80 text-amber-800 font-medium focus:border-amber-400"
                aria-required="true"
              >
                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Frosting */}
            <div>
              <label htmlFor="frosting" className="block text-sm font-semibold text-amber-800 mb-2">Frosting Type</label>
              <select
                id="frosting"
                value={form.frosting}
                onChange={e => setForm(p => ({ ...p, frosting: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-white/80 text-amber-800 font-medium focus:border-amber-400"
              >
                {frostings.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Theme */}
            <fieldset>
              <legend className="block text-sm font-semibold text-amber-800 mb-2">Theme / Style</legend>
              <div className="flex flex-wrap gap-2">
                {themes.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, theme: t }))}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      form.theme === t
                        ? 'border-amber-500 bg-amber-50 text-amber-800'
                        : 'border-amber-200 text-amber-700 hover:border-amber-400 bg-white/60'
                    }`}
                    aria-pressed={form.theme === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Colour */}
            <div className="flex items-center gap-4">
              <div>
                <label htmlFor="cake-color" className="block text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <Palette size={14} aria-hidden="true" /> Colour Theme
                </label>
                <input
                  id="cake-color"
                  type="color"
                  value={form.color}
                  onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                  className="w-12 h-10 rounded-xl border-2 border-amber-200 cursor-pointer"
                  aria-label="Select cake colour theme"
                />
              </div>
              <div
                className="flex-1 h-10 rounded-xl border-2 border-amber-100 flex items-center justify-center text-sm font-medium"
                style={{ backgroundColor: form.color + '60' }}
                aria-label={`Selected colour: ${form.color}`}
              >
                {form.color}
              </div>
            </div>

            {/* Decorations */}
            <fieldset>
              <legend className="block text-sm font-semibold text-amber-800 mb-2">Decorations</legend>
              <div className="flex flex-wrap gap-2">
                {decorations.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDecoration(d)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      form.decorations.includes(d)
                        ? 'border-pink-400 bg-pink-50 text-pink-700'
                        : 'border-amber-200 text-amber-700 hover:border-amber-400 bg-white/60'
                    }`}
                    aria-pressed={form.decorations.includes(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Message */}
            <div>
              <label htmlFor="custom-message" className="block text-sm font-semibold text-amber-800 mb-2">Custom Message</label>
              <input
                id="custom-message"
                type="text"
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder="Happy Birthday! 🎉"
                maxLength={60}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-white/80 text-amber-800 placeholder-amber-300 focus:border-amber-400"
                aria-describedby="message-count"
              />
              <p id="message-count" className="text-xs text-amber-500 mt-1">{form.message.length}/60 characters</p>
            </div>

            {/* Reference image */}
            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-2">Reference Image (optional)</label>
              <label
                htmlFor="ref-image"
                className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/50 cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all"
                aria-label="Upload reference image"
              >
                <Upload size={20} className="text-amber-400" aria-hidden="true" />
                <span className="text-amber-600 text-sm font-medium">Click to upload</span>
                <span className="text-amber-400 text-xs">PNG, JPG up to 5MB</span>
                <input id="ref-image" type="file" accept="image/*" className="sr-only" aria-label="Upload reference image file" />
              </label>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                id="form-consent"
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-amber-300 accent-amber-500"
                aria-required="true"
              />
              <label htmlFor="form-consent" className="text-xs text-amber-600 leading-relaxed">
                I agree to the{' '}
                <a href="/privacy-policy" className="underline hover:text-amber-800" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                {' '}and consent to Velvet Crumbs contacting me about my custom cake order. I understand my data will only be used to process this enquiry.
              </label>
            </div>

            <button
              type="submit"
              className={`btn-ripple w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                submitted
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-xl hover:scale-[1.02] shadow-lg'
              }`}
              aria-live="polite"
            >
              {submitted ? '✓ Request Sent! We will call you soon.' : 'Request Custom Cake'}
            </button>
          </form>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-24">
            <div
              className="rounded-3xl p-6 text-center"
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(201,168,76,0.25)',
                boxShadow: '0 8px 40px rgba(125,75,42,0.12)',
              }}
              aria-label="Live cake preview and price estimate"
            >
              <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-4">Live Preview</p>

              {/* Cake preview illustration */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-7xl animate-float shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${form.color}80, ${form.color}40)`,
                    border: `4px solid ${form.color}`,
                  }}
                  role="img"
                  aria-label={`Preview of ${form.theme} themed cake`}
                >
                  🎂
                </div>
                {form.decorations.includes('Edible Gold') && (
                  <div className="absolute top-2 right-2 text-2xl animate-sparkle" aria-hidden="true">✨</div>
                )}
                {form.decorations.includes('Fresh Flowers') && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl" aria-hidden="true">🌸</div>
                )}
              </div>

              {/* Summary */}
              <div className="text-left space-y-2.5 mb-6">
                {[
                  { label: 'Flavor', value: form.flavor },
                  { label: 'Size', value: form.size },
                  { label: 'Frosting', value: form.frosting },
                  { label: 'Theme', value: form.theme },
                  { label: 'Decorations', value: form.decorations.join(', ') || 'None' },
                  { label: 'Message', value: form.message || '—' },
                ].map(row => (
                  <div key={row.label} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-xs text-amber-500 font-medium">{row.label}: </span>
                      <span className="text-sm text-amber-800 font-semibold">{row.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price estimate */}
              <div
                className="rounded-2xl p-4"
                style={{ background: 'linear-gradient(135deg, #FDF6EC, #F9D5E5)' }}
                aria-live="polite"
                aria-label={`Estimated price: PKR ${estimatedPrice.toLocaleString()}`}
              >
                <p className="text-xs text-amber-600 mb-1">Estimated Price</p>
                <p className="font-display text-3xl font-bold text-amber-700">
                  PKR {estimatedPrice.toLocaleString()}
                </p>
                <p className="text-xs text-amber-500 mt-1">Final price confirmed after consultation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
