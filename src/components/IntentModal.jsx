import React, { useState } from 'react';
import { X, Flame, Bookmark, BellRing, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const IntentModal = ({ product, onClose }) => {
  const { addToBoard, addToWaitlist, waitlistItems } = useWishlist();

  const existingWaitlist = waitlistItems.find(w => w.productId === product.id);

  const [selectedSize, setSelectedSize] = useState(existingWaitlist?.selectedSize || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(existingWaitlist?.selectedColor || product.colors[0]);
  const [activeTab, setActiveTab] = useState('waitlist'); // 'waitlist' or 'board'

  if (!product) return null;

  const handleSaveWaitlist = () => {
    addToWaitlist(product.id, selectedSize, selectedColor);
    onClose();
  };

  const handleSaveBoard = () => {
    addToBoard(product.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-myntra-border transform transition-all">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-900 to-myntra-charcoal p-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-myntra-gold font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Wishlist Intent Architecture
          </div>
          <h2 className="text-lg font-extrabold mt-1">Select Saving Intent</h2>
          <p className="text-xs text-gray-300 mt-0.5">
            How would you like to track <span className="font-bold text-white">{product.brand} {product.title}</span>?
          </p>
        </div>

        {/* Product Preview Snippet */}
        <div className="flex items-center gap-4 p-4 bg-myntra-lightBg border-b border-myntra-border">
          <img
            src={product.image}
            alt={product.title}
            className="w-14 h-18 object-cover rounded-md border border-gray-200"
          />
          <div>
            <div className="font-bold text-xs text-myntra-gray uppercase">{product.brand}</div>
            <div className="font-extrabold text-sm text-myntra-charcoal">{product.title}</div>
            <div className="text-xs font-bold text-myntra-pink mt-1">₹{product.price}</div>
          </div>
        </div>

        {/* Intent Option Selector */}
        <div className="p-5 space-y-4">
          
          {/* Option A: Waitlist (High Intent) */}
          <div
            onClick={() => setActiveTab('waitlist')}
            className={`cursor-pointer rounded-xl p-4 border-2 transition-all relative ${
              activeTab === 'waitlist'
                ? 'border-myntra-pink bg-pink-50/50 shadow-md'
                : 'border-gray-200 hover:border-pink-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-myntra-pink/10 text-myntra-pink flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-myntra-charcoal">The Waitlist</span>
                    <span className="bg-myntra-pink text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      High Intent
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    For active buying intent. Track price drops & restock alerts.
                  </p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                activeTab === 'waitlist' ? 'border-myntra-pink bg-myntra-pink text-white' : 'border-gray-300'
              }`}>
                {activeTab === 'waitlist' && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            {/* Mandatory Size & Color Selector for Waitlist */}
            {activeTab === 'waitlist' && (
              <div className="mt-4 pt-3 border-t border-pink-200/60 space-y-3">
                
                {/* Size Selection */}
                <div>
                  <label className="block text-xs font-extrabold text-myntra-charcoal uppercase tracking-wider mb-1.5">
                    Select Your Size <span className="text-myntra-pink">* (Mandatory)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all ${
                          selectedSize === size
                            ? 'bg-myntra-charcoal text-white border-myntra-charcoal shadow-sm'
                            : 'bg-white text-myntra-charcoal border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Variant Selection */}
                <div>
                  <label className="block text-xs font-extrabold text-myntra-charcoal uppercase tracking-wider mb-1.5">
                    Select Color Variant
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={(e) => { e.stopPropagation(); setSelectedColor(color); }}
                        className={`px-2.5 py-1 text-xs font-semibold rounded border transition-all ${
                          selectedColor === color
                            ? 'bg-myntra-pink text-white border-myntra-pink font-bold'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-myntra-pink font-semibold flex items-center gap-1">
                  <BellRing className="w-3.5 h-3.5" />
                  Real-time alerts enabled for {selectedSize} / {selectedColor}
                </div>

              </div>
            )}
          </div>

          {/* Option B: Visual Board (Low Intent) */}
          <div
            onClick={() => setActiveTab('board')}
            className={`cursor-pointer rounded-xl p-4 border-2 transition-all relative ${
              activeTab === 'board'
                ? 'border-purple-600 bg-purple-50/50 shadow-md'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-myntra-charcoal">The Visual Board</span>
                    <span className="bg-purple-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      Moodboarding
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    For casual inspiration. No size selection needed.
                  </p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                activeTab === 'board' ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-300'
              }`}>
                {activeTab === 'board' && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Buttons */}
        <div className="p-4 bg-gray-50 border-t border-myntra-border flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-bold text-myntra-gray hover:text-myntra-charcoal px-3 py-2"
          >
            Cancel
          </button>

          {activeTab === 'waitlist' ? (
            <button
              onClick={handleSaveWaitlist}
              className="px-6 py-2.5 bg-myntra-pink hover:bg-myntra-pinkHover text-white font-extrabold text-xs rounded-lg uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Add to Waitlist ({selectedSize})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSaveBoard}
              className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs rounded-lg uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <span>Save to Visual Board</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
