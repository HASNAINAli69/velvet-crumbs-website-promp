import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF6EC' }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 mb-8 transition-colors"
          aria-label="Back to Velvet Crumbs homepage"
        >
          <ArrowLeft size={18} aria-hidden="true" /> Back to Home
        </a>

        <h1 className="font-display text-4xl font-bold text-amber-900 mb-2">Privacy Policy</h1>
        <p className="text-amber-600 text-sm mb-8">Last updated: January 2025</p>

        <div className="prose prose-amber max-w-none space-y-6 text-amber-800/80">
          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">1. Who We Are</h2>
            <p>Velvet Crumbs ("we", "us", "our") is a premium artisan bakery located at 12 Gulberg Main Blvd, Lahore, Pakistan. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website at velvetcrumbs.pk.</p>
            <p className="mt-2">Contact us: <a href="mailto:hello@velvetcrumbs.pk" className="text-amber-600 underline hover:text-amber-800">hello@velvetcrumbs.pk</a> | +92 300 123 4567</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">2. What Data We Collect</h2>
            <p>We only collect data that is strictly necessary to provide our services:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Contact information:</strong> Name, email address, and phone number when you submit a contact or custom cake enquiry form.</li>
              <li><strong>Order details:</strong> Product selections, delivery information, and custom cake specifications when you place an order.</li>
              <li><strong>Technical data:</strong> Basic session cookies required for website functionality (cart, form state). No analytics cookies are used without consent.</li>
            </ul>
            <p className="mt-2">We do <strong>not</strong> collect payment card data directly — payments are handled by third-party providers. We do <strong>not</strong> use advertising or tracking cookies.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">3. Why We Collect It (Legal Basis)</h2>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Contract performance:</strong> To process your cake orders and respond to custom cake requests.</li>
              <li><strong>Legitimate interest:</strong> To improve our website and customer service.</li>
              <li><strong>Consent:</strong> For newsletter subscriptions and optional analytics. You may withdraw consent at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">4. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>To process and confirm your cake orders</li>
              <li>To respond to enquiries and custom cake design requests</li>
              <li>To send order confirmation and delivery updates</li>
              <li>To send newsletter emails (only if you subscribed)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">5. Who We Share It With</h2>
            <p>We do not sell your personal data. We may share it with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Delivery partners — only the information required to fulfil your order</li>
              <li>Payment processors — for secure transaction handling</li>
              <li>IT service providers — under strict confidentiality agreements</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">6. How Long We Keep It</h2>
            <p>We retain your personal data for as long as necessary to fulfil the purposes described above, or as required by law (typically up to 7 years for financial records). Newsletter subscribers' data is retained until you unsubscribe.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p className="mt-2">To exercise your rights, contact: <a href="mailto:hello@velvetcrumbs.pk" className="text-amber-600 underline">hello@velvetcrumbs.pk</a></p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">8. Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. All data transmissions use SSL/TLS encryption.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-amber-900 mb-3">9. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Significant changes will be notified via email or a prominent notice on our website.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
