import { useState, useEffect, useCallback } from 'react';
import { CartProvider } from './context/CartContext';
import { useScrollProgress } from './hooks/useScrollReveal';

// Components
import CustomCursor from './components/ui/CustomCursor';
import CookieBanner from './components/ui/CookieBanner';
import LoadingScreen from './components/sections/LoadingScreen';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import SearchBar from './components/sections/SearchBar';
import Marquee from './components/sections/Marquee';
import Products from './components/sections/Products';
import Featured360 from './components/sections/Featured360';
import CustomCake from './components/sections/CustomCake';
import About from './components/sections/About';
import Reviews from './components/sections/Reviews';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import CartDrawer from './components/sections/CartDrawer';

// Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import RefundPolicy from './pages/RefundPolicy';

function ScrollProgress() {
  useScrollProgress();
  return (
    <div
      id="scroll-progress"
      className="scroll-progress"
      style={{ width: '0%' }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

function MainSite() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main id="main-content">
      <Hero />
      <SearchBar onSearch={setSearchQuery} />
      <Marquee />
      <Products searchQuery={searchQuery} />
      <Featured360 />
      <CustomCake />
      <About />
      <Reviews />
      <Contact />
    </main>
  );
}

function Router() {
  const path = window.location.pathname;

  if (path === '/privacy-policy') return <PrivacyPolicy />;
  if (path === '/terms') return <Terms />;
  if (path === '/cookie-policy') return <CookiePolicy />;
  if (path === '/refund-policy') return <RefundPolicy />;

  return null; // Main site
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLegalPage = ['/privacy-policy', '/terms', '/cookie-policy', '/refund-policy'].includes(window.location.pathname);

  const handleLoadDone = useCallback(() => {
    setLoading(false);
  }, []);

  // Skip loading for legal pages
  useEffect(() => {
    if (isLegalPage) setLoading(false);
  }, [isLegalPage]);

  return (
    <CartProvider>
      {/* Accessibility skip link */}
      <a href="#main-content" className="skip-link focus:top-0">
        Skip to main content
      </a>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Loading screen */}
      {loading && !isLegalPage && <LoadingScreen onDone={handleLoadDone} />}

      {/* Legal pages */}
      {isLegalPage && <Router />}

      {/* Main site */}
      {!isLegalPage && !loading && (
        <>
          <Navbar />
          <MainSite />
          <Footer />
          <CartDrawer />
          <CookieBanner />
        </>
      )}
    </CartProvider>
  );
}
