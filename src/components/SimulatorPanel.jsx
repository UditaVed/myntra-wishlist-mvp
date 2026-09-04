import React, { useState } from 'react';
import { X, Sliders, TrendingDown, PackageCheck, Clock, RefreshCw, Check, ChevronUp } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const SimulatorPanel = ({ isOpen, onClose }) => {
  const { 
    products, 
    waitlistItems, 
    triggerPriceDropSimulation, 
    triggerRestockSimulation, 
    trigger14DayDiscountSimulation,
    resetDemo
  } = useWishlist();

  const [selectedProductId, setSelectedProductId] = useState(
    waitlistItems.length > 0 ? waitlistItems[0].productId : products[0]?.id
  );

  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const showFeedback = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handlePriceDrop = () => {
    triggerPriceDropSimulation(selectedProductId, 20);
    showFeedback('⚡ Simulated 20% Price Drop alert!');
  };

  const handleRestock = () => {
    triggerRestockSimulation(selectedProductId);
    showFeedback('📦 Simulated Restock alert!');
  };

  const handle14DayDiscount = () => {
    trigger14DayDiscountSimulation(selectedProductId);
    showFeedback('🎯 Simulated 14-Day Micro-Discount 10% Coupon!');
  };

  const handleReset = () => {
    resetDemo();
    showFeedback('🔄 Demo state reset.');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-[#282c3f] text-white rounded-xl shadow-2xl border border-gray-700 overflow-hidden transition-all animate-slide-up">
      
      {/* Compact Header */}
      <div className="p-3 bg-gray-900 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#ff905a]" />
          <span className="font-extrabold text-xs uppercase tracking-wider text-white">
            Demo Simulator
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1"
          title="Minimize Simulator"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        
        {/* Status Toast */}
        {statusMessage && (
          <div className="p-2 bg-[#03a685] text-white text-[11px] font-bold rounded flex items-center gap-1.5 animate-bounce">
            <Check className="w-3.5 h-3.5" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Product Selector */}
        <div>
          <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">
            Target Product
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-xs text-white focus:outline-none focus:border-[#ff3f6c]"
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.brand} - {p.title} (Rs. {p.price})
              </option>
            ))}
          </select>
        </div>

        {/* Action Triggers */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handlePriceDrop}
            className="w-full py-2 px-3 bg-[#ff3f6c] hover:bg-[#e6335c] text-white font-extrabold text-xs rounded flex items-center justify-between shadow-xs transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" />
              Simulate &gt;5% Price Drop
            </span>
            <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded font-mono">F2</span>
          </button>

          <button
            onClick={handleRestock}
            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded flex items-center justify-between shadow-xs transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5" />
              Simulate Restock Event
            </span>
            <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded font-mono">F2</span>
          </button>

          <button
            onClick={handle14DayDiscount}
            className="w-full py-2 px-3 bg-[#ff905a] hover:bg-orange-600 text-white font-extrabold text-xs rounded flex items-center justify-between shadow-xs transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Fast-Forward 14 Days (10% Off)
            </span>
            <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded font-mono">F3</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-gray-700 flex items-center justify-between text-[10px] text-gray-400">
          <button
            onClick={handleReset}
            className="hover:text-white flex items-center gap-1 font-bold"
          >
            <RefreshCw className="w-3 h-3" /> Reset Demo
          </button>
          <span>Front-End Simulator</span>
        </div>

      </div>

    </div>
  );
};
