import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF6EC' }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <a href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 mb-8 transition-colors" aria-label="Back to homepage">
          <ArrowLeft size={18} aria-hidden="true" /> Back to Home
        </a>
        <h1 className="font-display text-4xl font-bold text-amber-900 mb-2">Cookie Policy</h1>
        <p className="text-amber-600 text-sm mb-8">Last updated: January 2025</p>
        <div className="space-y-6 text-amber-800/80">
          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device by websites you visit. They help the website remember your preferences and actions.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-3">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="text-left p-3 rounded-tl-xl text-amber-900 font-semibold">Cookie</th>
                    <th className="text-left p-3 text-amber-900 font-semibold">Purpose</th>
                    <th className="text-left p-3 text-amber-900 font-semibold">Duration</th>
                    <th className="text-left p-3 rounded-tr-xl text-amber-900 font-semibold">Required?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {[
                    { name: 'vc-cookie-consent', purpose: 'Stores your cookie consent preference', duration: '12 months', required: 'Yes' },
                    { name: 'session_id', purpose: 'Maintains your shopping cart session', duration: 'Session', required: 'Yes' },
                  ].map(row => (
                    <tr key={row.name} className="hover:bg-amber-50/50">
                      <td className="p-3 font-mono text-xs text-amber-700">{row.name}</td>
                      <td className="p-3">{row.purpose}</td>
                      <td className="p-3">{row.duration}</td>
                      <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-bold ${row.required === 'Yes' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{row.required}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">What We Don't Use</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>No advertising or marketing cookies</li>
              <li>No third-party analytics cookies (e.g., Google Analytics) without explicit consent</li>
              <li>No social media tracking cookies</li>
              <li>No cross-site tracking</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">Managing Cookies</h2>
            <p>You can control cookies through our cookie consent banner or your browser settings. Note that disabling necessary cookies may affect website functionality. To clear cookies, visit your browser's privacy or settings section.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">Contact</h2>
            <p>Questions? Email us at <a href="mailto:hello@velvetcrumbs.pk" className="text-amber-600 underline">hello@velvetcrumbs.pk</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
