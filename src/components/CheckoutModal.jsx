import React, { useState } from 'react';
import { X, ShieldCheck, Zap, CreditCard, CheckCircle2, ArrowRight, Truck, Tag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const CheckoutModal = ({ product, selectedSize, selectedColor, price, onClose }) => {
  const { checkoutBypass } = useWishlist();
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product) return null;

  const handleConfirmOrder = () => {
    checkoutBypass(product.id, selectedSize, selectedColor, price);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-myntra-border">
        
        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-myntra-success rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-myntra-charcoal">Order Placed Successfully!</h2>
            <p className="text-xs text-myntra-gray leading-relaxed">
              Your <span className="font-bold text-myntra-charcoal">{product.brand} {product.title}</span> ({selectedSize}) has been fast-tracked via Waitlist Checkout Bypass.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-left text-xs space-y-1">
              <div className="font-extrabold text-myntra-success uppercase">Fast-Track Telemetry Recorded</div>
              <div className="text-gray-600">• Saved ~4 steps compared to traditional cart flow.</div>
              <div className="text-gray-600">• Estimated Delivery: Tomorrow, 2:00 PM</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-myntra-charcoal text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Bypass Form */
          <div>
            {/* Header */}
            <div className="bg-gradient-to-r from-myntra-pink to-rose-600 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 fill-white" />
                <h2 className="font-extrabold text-base">Waitlist Express Checkout</h2>
              </div>
              <button onClick={onClose} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              
              {/* Product Summary */}
              <div className="flex gap-4 p-3 bg-myntra-lightBg rounded-xl border border-gray-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-20 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-myntra-gray uppercase">{product.brand}</div>
                  <div className="text-sm font-extrabold text-myntra-charcoal line-clamp-1">{product.title}</div>
                  
                  <div className="mt-1 flex items-center justify-between text-xs font-bold">
                    <span className="bg-myntra-pink/10 text-myntra-pink px-2 py-0.5 rounded">
                      Size: {selectedSize} • {selectedColor}
                    </span>
                    <span className="text-myntra-charcoal font-black text-sm">₹{price}</span>
                  </div>
                </div>
              </div>

              {/* Express Delivery Address */}
              <div className="p-3 border border-gray-200 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-myntra-charcoal font-extrabold uppercase">
                  <Truck className="w-4 h-4 text-myntra-pink" /> Delivery Address
                </div>
                <div className="font-bold text-gray-800">Udita Sharma (Home)</div>
                <div className="text-myntra-gray">104, Green Valley Apts, Indiranagar, Bengaluru - 560038</div>
              </div>

              {/* Payment Method */}
              <div className="p-3 border border-gray-200 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-myntra-charcoal font-extrabold uppercase">
                  <CreditCard className="w-4 h-4 text-myntra-pink" /> Saved Payment Method
                </div>
                <div className="font-bold text-gray-800">UPI • udita@okaxis (1-Click Fast Pay)</div>
              </div>

              {/* Total Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-myntra-border text-xs">
                <div className="flex justify-between text-myntra-gray">
                  <span>Item Total</span>
                  <span>₹{product.originalPrice}</span>
                </div>
                <div className="flex justify-between text-myntra-success font-bold">
                  <span>Waitlist Discount & Savings</span>
                  <span>-₹{product.originalPrice - price}</span>
                </div>
                <div className="flex justify-between text-myntra-charcoal font-black text-base pt-2 border-t">
                  <span>Total Amount</span>
                  <span className="text-myntra-pink">₹{price}</span>
                </div>
              </div>

              {/* Confirm CTA */}
              <button
                onClick={handleConfirmOrder}
                className="w-full py-3.5 bg-myntra-pink hover:bg-myntra-pinkHover text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Pay ₹{price} & Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1 text-[11px] text-myntra-gray font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-myntra-success" />
                Protected by Myntra 100% Purchase Guarantee
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
