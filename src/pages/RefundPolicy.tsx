import { ArrowLeft } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF6EC' }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <a href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 mb-8 transition-colors" aria-label="Back to homepage">
          <ArrowLeft size={18} aria-hidden="true" /> Back to Home
        </a>
        <h1 className="font-display text-4xl font-bold text-amber-900 mb-2">Refund Policy</h1>
        <p className="text-amber-600 text-sm mb-8">Last updated: January 2025</p>
        <div className="space-y-6 text-amber-800/80">
          {[
            {
              title: '1. Our Commitment',
              content: 'At Velvet Crumbs, your satisfaction is our priority. If you are not completely happy with your order, please contact us within 24 hours of delivery and we will do our best to make it right.',
            },
            {
              title: '2. Eligible Refunds',
              content: 'You may be eligible for a full refund or replacement if: (a) the product is significantly different from what was ordered; (b) the product arrived damaged due to our error; (c) there was an allergen error on our part after declaration.',
            },
            {
              title: '3. Non-Refundable Situations',
              content: 'Refunds are not available for: change of mind after baking has started; minor variations in colour or decoration that are inherent to handmade products; damage caused after delivery; custom cakes where the design was approved by the customer.',
            },
            {
              title: '4. Custom Cake Deposits',
              content: 'Custom cake deposits (50% of order value) are non-refundable if you cancel within 48 hours of the agreed delivery date, as ingredients and preparation work will have begun. If we cancel due to unforeseen circumstances, a full refund will be issued.',
            },
            {
              title: '5. How to Request a Refund',
              content: 'Contact us at hello@velvetcrumbs.pk or +92 300 123 4567 within 24 hours of delivery. Please include your order details, description of the issue, and photographs if applicable.',
            },
            {
              title: '6. Processing Time',
              content: 'Approved refunds are processed within 5–7 business days via the original payment method, or as store credit at your preference.',
            },
            {
              title: '7. Contact',
              content: 'For refund enquiries: hello@velvetcrumbs.pk | +92 300 123 4567 | 12 Gulberg Main Blvd, Lahore.',
            },
          ].map(section => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-bold text-amber-900 mb-2">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
