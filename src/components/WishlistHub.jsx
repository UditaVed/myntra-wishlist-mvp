import React, { useState } from 'react';
import { Flame, Bookmark, Trash2, Zap, Clock, Sparkles, Tag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const WishlistHub = ({ onOpenCheckout, onSwitchToCatalog }) => {
  const { 
    products, 
    allProducts,
    waitlistItems, 
    boardItems, 
    removeFromWaitlist, 
    removeFromBoard,
    addToWaitlist
  } = useWishlist();

  const [activeTab, setActiveTab] = useState('waitlist'); // 'waitlist' or 'board'

  const catalogList = allProducts || products || [];

  // Hydrate waitlist items with catalog data safely across all categories
  const hydratedWaitlist = waitlistItems.map(item => {
    const product = catalogList.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item && item.product);

  // Hydrate board items with catalog data safely across all categories
  const hydratedBoard = boardItems.map(item => {
    const product = catalogList.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item && item.product);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      
      {/* Wishlist Header Banner */}
      <div className="bg-gradient-to-r from-[#282c3f] via-gray-900 to-[#282c3f] rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff3f6c]/20 text-[#ff3f6c] border border-[#ff3f6c]/40 rounded-full text-xs font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Wishlist Conversion Funnel
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Intent-Segmented Wishlist
          </h1>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed font-normal">
            Separate low-intent moodboarding from high-intent purchase tracking. Waitlist items are proactively monitored for price drops, restocks, and 14-day micro-discounts.
          </p>
        </div>

        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/10 w-36">
              <div className="text-2xl font-black text-[#ff3f6c]">{hydratedWaitlist.length}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-300 mt-0.5">Waitlist Items</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/10 w-36">
              <div className="text-2xl font-black text-purple-400">{hydratedBoard.length}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-300 mt-0.5">Board Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('waitlist')}
          className={`pb-4 px-6 font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'waitlist'
              ? 'border-[#ff3f6c] text-[#ff3f6c]'
              : 'border-transparent text-gray-500 hover:text-[#282c3f]'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>My Waitlist ({hydratedWaitlist.length})</span>
          <span className="bg-[#ff3f6c] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">High Intent</span>
        </button>

        <button
          onClick={() => setActiveTab('board')}
          className={`pb-4 px-6 font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'board'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-gray-500 hover:text-[#282c3f]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Visual Board ({hydratedBoard.length})</span>
          <span className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Inspiration</span>
        </button>
      </div>

      {/* Tab Content: Waitlist (High Intent) */}
      {activeTab === 'waitlist' && (
        <div>
          {hydratedWaitlist.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-lg mx-auto">
              <Flame className="w-12 h-12 text-[#ff3f6c] mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-extrabold text-[#282c3f]">Your Waitlist is Empty</h3>
              <p className="text-xs text-gray-500 mt-1">
                Add high-intent items to your Waitlist to trigger real-time price alerts, restock notifications, and 14-day micro-discounts!
              </p>
              <button
                onClick={onSwitchToCatalog}
                className="mt-6 px-6 py-2.5 bg-[#ff3f6c] text-white text-xs font-extrabold uppercase rounded-lg shadow hover:bg-[#e6335c] transition-colors cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hydratedWaitlist.map(({ id, product, selectedSize, selectedColor, discountCoupon }) => {
                if (!product) return null;
                const finalPrice = discountCoupon ? discountCoupon.discountedPrice : product.price;

                return (
                  <div key={id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                    
                    {/* Top Content */}
                    <div>
                      {/* Image & Badges Header */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute top-3 left-3 bg-[#ff3f6c] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                          <Flame className="w-3 h-3" /> Waitlist Tracked
                        </div>

                        <button
                          onClick={() => removeFromWaitlist(product.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                          title="Remove from Waitlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <div className="text-xs font-bold text-gray-200">{product.brand}</div>
                          <div className="text-sm font-extrabold line-clamp-1">{product.title}</div>
                        </div>
                      </div>

                      {/* Details & Intent Specs */}
                      <div className="p-5 space-y-4">
                        
                        {/* Variant Specs */}
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg text-xs font-bold border border-gray-200">
                          <div>
                            <span className="text-gray-400 font-normal block text-[10px]">Tracked Variant</span>
                            <span className="text-[#282c3f]">{selectedSize} • {selectedColor}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-400 font-normal block text-[10px]">Stock Monitor</span>
                            <span className="text-emerald-600">
                              In Stock ({product.stockCount || 5})
                            </span>
                          </div>
                        </div>

                        {/* 14-Day Micro-Discount Perk Banner */}
                        {discountCoupon ? (
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-xl shadow-sm relative overflow-hidden">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-amber-300" />
                                <div>
                                  <div className="text-xs font-extrabold">14-Day Micro-Discount Active!</div>
                                  <div className="text-[11px] text-emerald-100 font-medium">Extra 10% OFF applied</div>
                                </div>
                              </div>
                              <div className="bg-white/20 px-2 py-1 rounded text-[10px] font-mono font-bold">
                                {discountCoupon.code}
                              </div>
                            </div>
                            <div className="mt-2 text-[10px] text-emerald-100 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Expires in 23h 59m
                            </div>
                          </div>
                        ) : (
                          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-[11px] text-amber-800 flex items-center justify-between font-medium">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              14-Day Micro-Discount Perk
                            </span>
                            <span className="font-bold">Pending (Day 14)</span>
                          </div>
                        )}

                        {/* Pricing Summary */}
                        <div className="flex items-baseline justify-between pt-1">
                          <span className="text-xs font-bold text-gray-500">Price:</span>
                          <div className="flex items-baseline gap-2">
                            {discountCoupon && (
                              <span className="text-xs text-gray-400 line-through">Rs. {product.price}</span>
                            )}
                            <span className="text-lg font-black text-[#282c3f]">
                              Rs. {finalPrice}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Action CTAs: Fast-Track Checkout Bypass */}
                    <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-2">
                      <button
                        onClick={() => onOpenCheckout(product, selectedSize, selectedColor, finalPrice)}
                        className="w-full py-2.5 bg-[#ff3f6c] hover:bg-[#e6335c] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-4 h-4 fill-white text-white" />
                        <span>Buy Now (Checkout Bypass)</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Visual Board (Inspiration) */}
      {activeTab === 'board' && (
        <div>
          {hydratedBoard.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-lg mx-auto">
              <Bookmark className="w-12 h-12 text-purple-600 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-extrabold text-[#282c3f]">Your Visual Board is Empty</h3>
              <p className="text-xs text-gray-500 mt-1">
                Save casual visual inspiration items here for moodboarding.
              </p>
              <button
                onClick={onSwitchToCatalog}
                className="mt-6 px-6 py-2.5 bg-purple-700 text-white text-xs font-extrabold uppercase rounded-lg shadow hover:bg-purple-800 transition-colors cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {hydratedBoard.map(({ id, product }) => {
                if (!product) return null;
                const defaultSize = (product.availableSizes && product.availableSizes[0]) || (product.sizes && product.sizes[0]) || 'M';
                const defaultColor = (product.colors && product.colors[0]) || 'Blue';

                return (
                  <div key={id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeFromBoard(product.id)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-rose-600 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-3">
                        <div className="text-xs font-bold text-[#282c3f] uppercase">{product.brand}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{product.title}</div>
                        <div className="text-sm font-extrabold text-[#282c3f] mt-1">Rs. {product.price}</div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t border-gray-200">
                      <button
                        onClick={() => addToWaitlist(product.id, defaultSize, defaultColor)}
                        className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-[11px] uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        Upgrade to Waitlist
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
