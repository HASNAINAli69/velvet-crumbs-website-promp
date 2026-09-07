import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { products } from '../../data/products';

const suggestions = [
  'Birthday Cake', 'Wedding Cake', 'Chocolate Brownie', 'Cupcakes',
  'Custom Cake', 'Cheesecake', 'Red Velvet', 'Pastries',
];

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<typeof products>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 4));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (val: string) => {
    setQuery(val);
    setFocused(false);
    onSearch?.(val);
    // Scroll to products section
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const showDropdown = focused && (query.length > 0 ? results.length > 0 : true);

  return (
    <section className="py-10 px-4" aria-label="Search cakes">
      <div className="max-w-3xl mx-auto" ref={containerRef}>
        {/* Glass Search Container */}
        <div
          className={`relative rounded-3xl transition-all duration-400 ${
            focused
              ? 'shadow-2xl shadow-amber-300/40 scale-[1.02]'
              : 'shadow-lg shadow-amber-200/30'
          }`}
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: focused
              ? '1.5px solid rgba(201,168,76,0.5)'
              : '1.5px solid rgba(255,255,255,0.6)',
          }}
        >
          <div className="flex items-center px-6 py-4 gap-4">
            {/* Search icon */}
            <div
              className={`flex-shrink-0 transition-all duration-300 ${focused ? 'scale-110 text-amber-500' : 'text-amber-400'}`}
              aria-hidden="true"
            >
              <Search size={22} />
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onKeyDown={e => {
                if (e.key === 'Enter' && query.trim()) handleSelect(query.trim());
                if (e.key === 'Escape') setFocused(false);
              }}
              placeholder="Search cakes, cupcakes, brownies…"
              className="flex-1 bg-transparent text-amber-900 placeholder-amber-400/70 text-lg font-medium outline-none border-none"
              aria-label="Search products"
              aria-autocomplete="list"
              aria-expanded={showDropdown}
              role="combobox"
              aria-controls="search-results"
            />

            {query && (
              <button
                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                className="flex-shrink-0 text-amber-400 hover:text-amber-600 transition-colors"
                aria-label="Clear search"
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div
              id="search-results"
              role="listbox"
              className="absolute top-full left-0 right-0 mt-3 rounded-2xl overflow-hidden z-50"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(201,168,76,0.3)',
                boxShadow: '0 20px 60px rgba(125,75,42,0.15)',
              }}
            >
              {query.length <= 1 && (
                <div className="p-4">
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-3 px-2">Popular Searches</p>
                  <div className="flex flex-wrap gap-2 px-2">
                    {suggestions.map(s => (
                      <button
                        key={s}
                        role="option"
                        aria-selected={false}
                        onClick={() => handleSelect(s)}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-sm font-medium hover:bg-amber-100 hover:text-amber-900 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.length > 0 && (
                <div className="p-3">
                  {results.map(product => (
                    <button
                      key={product.id}
                      role="option"
                      aria-selected={false}
                      onClick={() => handleSelect(product.name)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 transition-colors text-left group"
                    >
                      <img
                        src={product.image}
                        alt={product.alt}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-amber-900 text-sm truncate">{product.name}</p>
                        <p className="text-amber-600 text-xs">PKR {product.price.toLocaleString()}</p>
                      </div>
                      <span className="text-amber-400 group-hover:text-amber-600 transition-colors text-xs">→</span>
                    </button>
                  ))}
                </div>
              )}

              {results.length === 0 && query.length > 1 && (
                <div className="p-6 text-center text-amber-600">
                  <p className="text-2xl mb-2">🔍</p>
                  <p className="font-medium">No results for "<span className="text-amber-800">{query}</span>"</p>
                  <p className="text-sm mt-1">Try "Birthday Cake" or "Brownies"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
