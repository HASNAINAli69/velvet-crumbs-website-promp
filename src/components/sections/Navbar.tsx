import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Cake } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Cakes', href: '#products' },
  { label: 'Cupcakes', href: '#products' },
  { label: 'Custom Cakes', href: '#custom' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'products', 'custom', 'about', 'reviews', 'contact'];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-amber-900/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group" aria-label="Velvet Crumbs Home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Cake size={20} className="text-white" aria-hidden="true" />
            </div>
            <span className="font-display text-xl font-bold text-amber-900">
              Velvet <span className="text-amber-500">Crumbs</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-6" role="list">
            {navLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`nav-link text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-amber-600 active'
                      : 'text-amber-900 hover:text-amber-600'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors btn-ripple"
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <ShoppingCart size={20} className="text-amber-700" aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold" aria-live="polite">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="lg:hidden p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={20} className="text-amber-700" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`mobile-menu fixed inset-0 z-[9500] bg-cream lg:hidden ${mobileOpen ? 'open' : ''}`}
        style={{ backgroundColor: '#FDF6EC' }}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <span className="font-display text-2xl font-bold text-amber-900">
              Velvet <span className="text-amber-500">Crumbs</span>
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-xl hover:bg-amber-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} className="text-amber-700" aria-hidden="true" />
            </button>
          </div>
          <ul className="flex flex-col gap-4" role="list">
            {navLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-2xl font-display font-semibold text-amber-900 hover:text-amber-600 transition-colors py-2 border-b border-amber-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <p className="text-amber-600 text-sm">Made with ❤️ in Lahore</p>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9400] bg-black/30"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
