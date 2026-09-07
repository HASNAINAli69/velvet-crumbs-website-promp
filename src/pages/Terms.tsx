import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF6EC' }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <a href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 mb-8 transition-colors" aria-label="Back to homepage">
          <ArrowLeft size={18} aria-hidden="true" /> Back to Home
        </a>
        <h1 className="font-display text-4xl font-bold text-amber-900 mb-2">Terms & Conditions</h1>
        <p className="text-amber-600 text-sm mb-8">Last updated: January 2025</p>
        <div className="space-y-6 text-amber-800/80">
          {[
            { title: '1. Agreement', content: 'By accessing or using the Velvet Crumbs website (velvetcrumbs.pk), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.' },
            { title: '2. Products & Pricing', content: 'All prices are displayed in Pakistani Rupees (PKR) and are subject to change without notice. Prices do not include delivery charges unless stated. Product images are for illustrative purposes; actual products may vary slightly.' },
            { title: '3. Orders', content: 'Placing an order constitutes an offer to purchase. Orders are confirmed only after our team contacts you. We reserve the right to decline orders at our discretion. Custom cake orders require a 50% deposit upon confirmation.' },
            { title: '4. Delivery', content: 'Delivery is available within Lahore. Delivery times are estimates only. We are not responsible for delays caused by factors beyond our control. Free delivery applies to orders over PKR 5,000 within our delivery zone.' },
            { title: '5. Custom Cakes', content: 'Custom cake orders must be placed at least 72 hours in advance. Reference images shared with us are used solely for design purposes and are deleted after order completion. We reserve the right to modify designs that infringe third-party intellectual property.' },
            { title: '6. Allergies & Dietary', content: 'Our products may contain or be made in an environment with nuts, dairy, eggs, gluten, and other allergens. Please inform us of any allergies when ordering. We cannot guarantee allergen-free products.' },
            { title: '7. Intellectual Property', content: 'All content on this website — including text, images, logos, and designs — is the property of Velvet Crumbs and is protected by copyright. Unauthorised use is prohibited.' },
            { title: '8. Limitation of Liability', content: 'To the fullest extent permitted by law, Velvet Crumbs is not liable for any indirect, incidental, or consequential damages arising from use of our website or products.' },
            { title: '9. Governing Law', content: 'These terms are governed by the laws of Pakistan. Disputes shall be resolved in the courts of Lahore, Pakistan.' },
            { title: '10. Contact', content: 'Questions about these terms: hello@velvetcrumbs.pk | +92 300 123 4567' },
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
