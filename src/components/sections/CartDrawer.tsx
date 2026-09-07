import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [checkoutDone, setCheckoutDone] = useState(false);
  const delivery = subtotal > 0 ? (subtotal >= 5000 ? 0 : 250) : 0;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    setCheckoutDone(true);
    clearCart();
    setTimeout(() => { setCheckoutDone(false); setIsOpen(false); }, 3000);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[9600]"
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`cart-drawer fixed top-0 right-0 bottom-0 w-full sm:w-96 z-[9700] flex flex-col ${isOpen ? 'open' : ''}`}
        style={{
          background: 'rgba(253,246,236,0.98)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(201,168,76,0.25)',
          boxShadow: '-20px 0 60px rgba(125,75,42,0.15)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-600" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-amber-900">Your Cart</h2>
            {items.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold" aria-label={`${items.length} items`}>
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-xl hover:bg-amber-100 flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <X size={18} className="text-amber-700" aria-hidden="true" />
          </button>
        </div>

        {/* Order success */}
        {checkoutDone && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="text-6xl animate-bounce" aria-hidden="true">🎉</div>
            <h3 className="font-display text-2xl font-bold text-amber-900">Order Placed!</h3>
            <p className="text-amber-700">Thank you for your order. We will contact you shortly to confirm details.</p>
          </div>
        )}

        {/* Empty */}
        {!checkoutDone && items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="text-6xl" aria-hidden="true">🧁</div>
            <p className="font-display text-xl text-amber-800">Your cart is empty</p>
            <p className="text-amber-600 text-sm">Add some delicious cakes to get started!</p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
            >
              Browse Cakes
            </button>
          </div>
        )}

        {/* Items */}
        {!checkoutDone && items.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3" role="list" aria-label="Cart items">
              {items.map((item, i) => (
                <article
                  key={`${item.product.id}-${item.size}-${item.flavor}-${i}`}
                  role="listitem"
                  className="flex gap-3 p-3 rounded-2xl bg-white/70 border border-amber-100"
                  aria-label={`${item.product.name}, ${item.size}, ${item.flavor}`}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.alt}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-amber-900 text-sm truncate">{item.product.name}</p>
                    <p className="text-amber-500 text-xs">{item.size} · {item.flavor}</p>
                    {item.message && (
                      <p className="text-amber-400 text-xs italic truncate">"{item.message}"</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2" role="group" aria-label={`Quantity for ${item.product.name}`}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.flavor, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} aria-hidden="true" />
                        </button>
                        <span className="text-sm font-bold text-amber-900 w-5 text-center" aria-live="polite">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.flavor, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-bold text-amber-700 text-sm">
                        PKR {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size, item.flavor)}
                    className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 size={14} className="text-red-400" aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>

            {/* Summary */}
            <div className="p-4 border-t border-amber-100 space-y-3">
              <div className="space-y-1.5 text-sm" aria-label="Order summary">
                <div className="flex justify-between text-amber-700">
                  <span>Subtotal</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? <span className="text-green-600 font-medium">Free</span> : `PKR ${delivery}`}</span>
                </div>
                {delivery > 0 && (
                  <p className="text-xs text-amber-500">Free delivery on orders over PKR 5,000</p>
                )}
                <div className="flex justify-between font-bold text-amber-900 text-base pt-2 border-t border-amber-100">
                  <span>Total</span>
                  <span>PKR {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-ripple w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                aria-label={`Proceed to checkout, total PKR ${total.toLocaleString()}`}
              >
                Checkout — PKR {total.toLocaleString()}
              </button>

              <p className="text-center text-xs text-amber-500">
                🔒 Secure checkout · Cash on delivery available
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
