import React from 'react';
import { X, Bell, Flame, Tag, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const NotificationDrawer = ({ isOpen, onClose, onOpenCheckout }) => {
  const { notifications, products, markNotificationRead } = useWishlist();

  if (!isOpen) return null;

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    const product = products.find(p => p.id === notif.productId);
    if (product) {
      onOpenCheckout(product, product.sizes[0], product.colors[0], product.price);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 bg-myntra-charcoal text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-myntra-pink" />
              <h2 className="font-extrabold text-base">Waitlist Alert Center</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-myntra-gray">
                <Bell className="w-10 h-10 mx-auto opacity-40 mb-3" />
                <p className="text-sm font-bold">No active notifications</p>
                <p className="text-xs mt-1">Use the Demo Simulator to trigger price drops or restock alerts!</p>
              </div>
            ) : (
              notifications.map((notif) => {
                const product = products.find(p => p.id === notif.productId);

                return (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-xl border transition-all ${
                      notif.read
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-pink-50/70 border-myntra-pink/40 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {product && (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-16 object-cover rounded border border-gray-200"
                        />
                      )}

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-myntra-charcoal">
                            {notif.title}
                          </span>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-myntra-pink rounded-full" />
                          )}
                        </div>

                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {notif.message}
                        </p>

                        {/* CTA */}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[10px] text-myntra-gray font-semibold">
                            {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>

                          <button
                            onClick={() => handleNotificationClick(notif)}
                            className="px-3 py-1.5 bg-myntra-pink hover:bg-myntra-pinkHover text-white text-[11px] font-extrabold rounded-md uppercase tracking-wider flex items-center gap-1 shadow-xs"
                          >
                            <Zap className="w-3 h-3 fill-white" />
                            <span>Buy Now (Bypass)</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Info */}
          <div className="p-3 bg-gray-50 border-t border-myntra-border text-center text-[11px] text-myntra-gray font-semibold">
            Proactive Waitlist Notifications (PRD Feature 2 & 3)
          </div>

        </div>
      </div>
    </div>
  );
};
