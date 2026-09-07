import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  flavor: string;
  message: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, flavor: string, message: string, qty?: number) => void;
  removeFromCart: (productId: number, size: string, flavor: string) => void;
  updateQuantity: (productId: number, size: string, flavor: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const addToCart = (product: Product, size: string, flavor: string, message: string, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.size === size && i.flavor === flavor
      );
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size && i.flavor === flavor
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { product, quantity: qty, size, flavor, message }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: number, size: string, flavor: string) => {
    setItems(prev => prev.filter(
      i => !(i.product.id === productId && i.size === size && i.flavor === flavor)
    ));
  };

  const updateQuantity = (productId: number, size: string, flavor: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size, flavor);
      return;
    }
    setItems(prev => prev.map(i =>
      i.product.id === productId && i.size === size && i.flavor === flavor
        ? { ...i, quantity: qty }
        : i
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, subtotal, isOpen, setIsOpen, wishlist, toggleWishlist,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
