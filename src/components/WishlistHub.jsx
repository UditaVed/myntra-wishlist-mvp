import React, { useState } from 'react';
import { Flame, Bookmark, Trash2, ShoppingBag, Zap, Clock, Bell, Sparkles, Tag, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const WishlistHub = ({ onOpenCheckout, onSwitchToCatalog }) => {
  const { 
    products, 
    waitlistItems, 
    boardItems, 
    removeFromWaitlist, 
    removeFromBoard,
    addToWaitlist
  } = useWishlist();

  const [activeTab, setActiveTab] = useState('waitlist'); // 'waitlist' or 'board'

  // Hydrate waitlist items with catalog data
  const hydratedWaitlist = waitlistItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  // Hydrate board items with catalog data
  const hydratedBoard = boardItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Wishlist Header Banner */}
      <div className="bg-gradient-to-r from-myntra-charcoal via-gray-900 to-myntra-charcoal rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-myntra-pink/20 text-myntra-pink border border-myntra-pink/40 rounded-full text-xs font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Wishlist Conversion Funnel
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Intent-Segmented Wishlist
          </h1>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            Separate low-intent moodboarding from high-intent purchase tracking. Waitlist items are proactively monitored for price drops, restocks, and 14-day micro-discounts.
          </p>
        </div>

        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/10 w-36">
              <div className="text-2xl font-black text-myntra-pink">{waitlistItems.length}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-300 mt-0.5">Waitlist Items</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/10 w-36">
              <div className="text-2xl font-black text-purple-400">{boardItems.length}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-300 mt-0.5">Board Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-myntra-border mb-8">
        <button
          onClick={() => setActiveTab('waitlist')}
          className={`pb-4 px-6 font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'waitlist'
              ? 'border-myntra-pink text-myntra-pink'
              : 'border-transparent text-myntra-gray hover:text-myntra-charcoal'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>My Waitlist ({waitlistItems.length})</span>
          <span className="bg-myntra-pink text-white text-[10px] px-2 py-0.5 rounded-full">High Intent</span>
        </button>

        <button
          onClick={() => setActiveTab('board')}
          className={`pb-4 px-6 font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'board'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-myntra-gray hover:text-myntra-charcoal'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Visual Board ({boardItems.length})</span>
          <span className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full">Inspiration</span>
        </button>
      </div>

      {/* Tab Content: Waitlist (High Intent) */}
      {activeTab === 'waitlist' && (
        <div>
          {hydratedWaitlist.length === 0 ? (
            <div className="bg-white border border-myntra-border rounded-xl p-12 text-center max-w-lg mx-auto">
              <Flame className="w-12 h-12 text-myntra-pink mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-extrabold text-myntra-charcoal">Your Waitlist is Empty</h3>
              <p className="text-xs text-myntra-gray mt-1">
                Add high-intent items to your Waitlist to trigger real-time price alerts, restock notifications, and 14-day micro-discounts!
              </p>
              <button
                onClick={onSwitchToCatalog}
                className="mt-6 px-6 py-2.5 bg-myntra-pink text-white text-xs font-extrabold uppercase rounded-lg shadow hover:bg-myntra-pinkHover transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hydratedWaitlist.map(({ id, product, selectedSize, selectedColor, discountCoupon }) => {
                
                const finalPrice = discountCoupon ? discountCoupon.discountedPrice : product.price;

                return (
                  <div key={id} className="bg-white border border-myntra-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                    
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

                        <div className="absolute top-3 left-3 bg-myntra-pink text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                          <Flame className="w-3 h-3" /> Waitlist Tracked
                        </div>

                        <button
                          onClick={() => removeFromWaitlist(product.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
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
                        <div className="flex items-center justify-between bg-myntra-lightBg p-3 rounded-lg text-xs font-bold border border-gray-200">
                          <div>
                            <span className="text-myntra-gray font-normal block text-[10px]">Tracked Variant</span>
                            <span className="text-myntra-charcoal">{selectedSize} • {selectedColor}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-myntra-gray font-normal block text-[10px]">Stock Monitor</span>
                            <span className={product.stockStatus === 'IN_STOCK' ? 'text-myntra-success' : 'text-rose-600'}>
                              {product.stockStatus === 'IN_STOCK' ? `In Stock (${product.stockCount})` : 'Out of Stock'}
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
                          <span className="text-xs font-bold text-myntra-gray">Price:</span>
                          <div className="flex items-baseline gap-2">
                            {discountCoupon && (
                              <span className="text-xs text-myntra-gray line-through">₹{product.price}</span>
                            )}
                            <span className="text-lg font-black text-myntra-charcoal">
                              ₹{finalPrice}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Action CTAs: Fast-Track Checkout Bypass */}
                    <div className="p-4 bg-gray-50 border-t border-myntra-border space-y-2">
                      <button
                        onClick={() => onOpenCheckout(product, selectedSize, selectedColor, finalPrice)}
                        className="w-full py-2.5 bg-myntra-pink hover:bg-myntra-pinkHover text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5"
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
            <div className="bg-white border border-myntra-border rounded-xl p-12 text-center max-w-lg mx-auto">
              <Bookmark className="w-12 h-12 text-purple-600 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-extrabold text-myntra-charcoal">Your Visual Board is Empty</h3>
              <p className="text-xs text-myntra-gray mt-1">
                Save casual visual inspiration items here for moodboarding.
              </p>
              <button
                onClick={onSwitchToCatalog}
                className="mt-6 px-6 py-2.5 bg-purple-700 text-white text-xs font-extrabold uppercase rounded-lg shadow hover:bg-purple-800 transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {hydratedBoard.map(({ id, product }) => (
                <div key={id} className="bg-white border border-myntra-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeFromBoard(product.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-3">
                      <div className="text-xs font-bold text-myntra-charcoal uppercase">{product.brand}</div>
                      <div className="text-xs text-myntra-gray line-clamp-1">{product.title}</div>
                      <div className="text-sm font-extrabold text-myntra-charcoal mt-1">₹{product.price}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 border-t border-myntra-border">
                    <button
                      onClick={() => addToWaitlist(product.id, product.sizes[0], product.colors[0])}
                      className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-[11px] uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      Upgrade to Waitlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
