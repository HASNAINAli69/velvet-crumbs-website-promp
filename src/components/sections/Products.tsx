import { useState, useEffect, useRef } from 'react';
import { products, categories } from '../../data/products';
import ProductCard from './ProductCard';

interface ProductsProps {
  searchQuery?: string;
}

export default function Products({ searchQuery }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 px-4 section-reveal"
      aria-label="Our cake and pastry products"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">Our Collection</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-amber-900 mb-4">
            Crafted with <span className="shimmer-text">Passion</span>
          </h2>
          <p className="text-amber-700/70 max-w-xl mx-auto text-lg">
            Every bite tells a story. Discover our full range of handcrafted cakes, cupcakes, brownies, and seasonal specials.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Product categories"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-ripple ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-300/40 scale-105'
                  : 'bg-white/70 text-amber-700 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="tabpanel"
          aria-label={`Products in ${categories.find(c => c.id === activeCategory)?.label || 'all'} category`}
        >
          {filtered.length > 0 ? (
            filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-5xl mb-4">🎂</p>
              <p className="text-amber-700 text-lg font-medium">No cakes found</p>
              <p className="text-amber-500 text-sm">Try a different category or search term</p>
            </div>
          )}
        </div>

        {/* Results count */}
        {searchQuery && (
          <p className="text-center text-amber-600 mt-6 text-sm" aria-live="polite">
            Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        )}
      </div>
    </section>
  );
}
