import React, { useState } from 'react';
import { 
  Heart, ShoppingBag, Star, Truck, Check, ArrowLeft, Flame, 
  ShieldCheck, RefreshCw, CreditCard, Tag, Sparkles, ChevronRight, 
  ThumbsUp, UserCheck 
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetailPage = ({ product, onBack, onOpenIntentModal, onOpenCheckout }) => {
  const { addToCart, waitlistItems, boardItems, removeFromWaitlist, removeFromBoard } = useWishlist();

  const sizes = product.availableSizes || product.sizes || ['S', 'M', 'L', 'XL'];
  const colors = product.colors || ['Blue', 'White', 'Black'];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null); // null, 'success', 'error'
  const [activeTab, setActiveTab] = useState('specs');

  const waitlistItem = waitlistItems.find(w => w.productId === product.id);
  const boardItem = boardItems.find(b => b.productId === product.id);

  const isWaitlisted = !!waitlistItem;
  const isBoardSaved = !!boardItem;

  const handleWishlistButtonClick = () => {
    if (isWaitlisted) {
      removeFromWaitlist(product.id);
    } else if (isBoardSaved) {
      removeFromBoard(product.id);
    } else {
      onOpenIntentModal(product, selectedSize, selectedColor);
    }
  };

  const handleAddToBag = () => {
    addToCart(product.id, selectedSize, selectedColor, product.price);
  };

  const handleCheckPincode = () => {
    if (pincode.length >= 6) {
      setPincodeStatus('success');
    } else {
      setPincodeStatus('error');
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 text-[#282c3f] select-none">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-6 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={onBack} className="flex items-center gap-1 font-bold text-[#ff3f6c] hover:underline mr-2 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
          </button>
          <span>Home / Clothing / Men Clothing / Tshirts /</span>
          <span className="font-bold text-[#282c3f]">{product.brand} Tshirts</span>
          <span>&gt; More By {product.brand}</span>
        </div>
      </div>

      {/* Main PDP Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: 2x2 High-Res Multi-Angle Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden group">
              <img
                src={product.image}
                alt={`${product.title} - Front View`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden group">
              <img
                src={product.image}
                alt={`${product.title} - Detail View`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden group">
              <img
                src={product.image}
                alt={`${product.title} - Side View`}
                className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden group relative">
              <img
                src={product.image}
                alt={`${product.title} - Model View`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-xs">
                Model: 6'1" | Size M
              </div>
            </div>
          </div>

          {/* Product Specifications & Details Tabs */}
          <div className="border border-gray-200 rounded-md p-6 bg-white mt-6">
            <div className="flex border-b border-gray-200 mb-4 gap-6 text-sm font-bold">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'specs' ? 'border-[#ff3f6c] text-[#ff3f6c]' : 'border-transparent text-gray-500'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'details' ? 'border-[#ff3f6c] text-[#ff3f6c]' : 'border-transparent text-gray-500'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'reviews' ? 'border-[#ff3f6c] text-[#ff3f6c]' : 'border-transparent text-gray-500'
                }`}
              >
                Ratings & Reviews ({product.ratingCount})
              </button>
            </div>

            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Fabric</span>
                  <span className="font-bold text-[#282c3f]">100% Pure Cotton</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Fit</span>
                  <span className="font-bold text-[#282c3f]">Slim / Regular Tailored</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Length</span>
                  <span className="font-bold text-[#282c3f]">Regular Length</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Main Trend</span>
                  <span className="font-bold text-[#282c3f]">New Casual Basics</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Multipack Set</span>
                  <span className="font-bold text-[#282c3f]">Single Shirt</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Wash Care</span>
                  <span className="font-bold text-[#282c3f]">Machine Wash Cold</span>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
                <p>{product.description}</p>
                <p>Designed with modern comfort in mind, featuring precision stitching and high color retention after multiple washes.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-md">
                  <div className="text-center border-r border-gray-200 pr-6">
                    <div className="text-3xl font-black text-[#282c3f]">{product.rating} ★</div>
                    <div className="text-gray-400 text-[11px] mt-1">{product.ratingCount} Verified Buyers</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>Customer Fit:</span>
                      <span className="font-bold text-emerald-600">92% Rated True to Size</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>Quality Rating:</span>
                      <span className="font-bold text-emerald-600">4.8 / 5 Fabric Feel</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Product Buying & Intent Options */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          
          {/* Header & Title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#282c3f] uppercase tracking-wide">
              {product.brand}
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              {product.title}
            </p>

            {/* Rating Pill Banner */}
            <div className="inline-flex items-center gap-2 border border-gray-200 rounded px-2.5 py-1 mt-3 text-xs font-bold text-[#282c3f]">
              <span className="flex items-center gap-1">
                {product.rating} <Star className="w-3.5 h-3.5 fill-teal-600 text-teal-600" />
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500 font-medium">{product.ratingCount} Ratings</span>
            </div>
          </div>

          <div className="border-b border-gray-200 my-4" />

          {/* Pricing Section */}
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-[#282c3f]">Rs. {product.price}</span>
              <span className="text-base text-gray-400 line-through">MRP Rs. {product.originalPrice}</span>
              <span className="text-base font-extrabold text-[#ff905a]">({product.discountPercent}% OFF)</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-1">
              inclusive of all taxes
            </div>
          </div>

          {/* Offer Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3 text-xs space-y-1.5">
            <div className="font-bold text-emerald-800 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-emerald-600" /> Best Offer: Extra Rs. 100 OFF
            </div>
            <p className="text-emerald-700 font-medium text-[11px]">
              Use Coupon Code <span className="font-bold text-emerald-900">MYNTRA100</span> on orders above Rs. 999.
            </p>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#282c3f]">
                SELECT SIZE
              </span>
              <button className="text-xs font-bold text-[#ff3f6c] hover:underline cursor-pointer">
                SIZE CHART &gt;
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {sizes.map(size => {
                const isSelected = selectedSize === size;
                const isLowStock = product.lowStockSize === size;

                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border text-xs font-bold transition-all relative flex flex-col items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'border-[#ff3f6c] text-[#ff3f6c] ring-2 ring-[#ff3f6c]/30 font-black'
                        : 'border-gray-300 text-[#282c3f] hover:border-gray-400'
                    }`}
                  >
                    <span>{size}</span>
                    {isLowStock && (
                      <span className="text-[8px] text-rose-600 font-extrabold -mt-0.5">
                        {product.stockCount} left
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {product.lowStockSize === selectedSize && (
              <div className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1">
                ⚡ Hurry! Only {product.stockCount} units left in size {selectedSize}!
              </div>
            )}
          </div>

          {/* Color Selector */}
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#282c3f] block mb-2">
              SELECT COLOR
            </span>
            <div className="flex items-center gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                    selectedColor === color
                      ? 'bg-[#282c3f] text-white border-[#282c3f]'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Action Buttons: Add to Bag vs Intent Wishlist */}
          <div className="flex gap-4 pt-3">
            <button
              onClick={handleAddToBag}
              className="flex-1 py-3.5 bg-[#ff3f6c] hover:bg-[#e6335c] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-md shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 fill-white" />
              <span>ADD TO BAG</span>
            </button>

            <button
              onClick={handleWishlistButtonClick}
              className={`flex-1 py-3.5 border-2 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isWaitlisted
                  ? 'bg-rose-50 border-[#ff3f6c] text-[#ff3f6c]'
                  : isBoardSaved
                  ? 'bg-purple-50 border-purple-600 text-purple-700'
                  : 'bg-white border-gray-300 text-[#282c3f] hover:border-[#ff3f6c] hover:text-[#ff3f6c]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWaitlisted || isBoardSaved ? 'fill-current' : ''}`} />
              <span>
                {isWaitlisted ? 'WISHLISTED' : isBoardSaved ? 'IN BOARD' : 'WISHLIST'}
              </span>
            </button>
          </div>

          {/* Pincode & Delivery Checker */}
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#282c3f] uppercase tracking-wider">
              <Truck className="w-4 h-4 text-teal-600" /> Delivery Options
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode (e.g. 560001)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-[#ff3f6c]"
                maxLength={6}
              />
              <button
                onClick={handleCheckPincode}
                className="px-4 py-2 bg-[#282c3f] text-white text-xs font-bold rounded cursor-pointer hover:bg-gray-800"
              >
                CHECK
              </button>
            </div>

            {pincodeStatus === 'success' && (
              <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Express Delivery available by Tomorrow, 4 PM!
              </div>
            )}
            {pincodeStatus === 'error' && (
              <div className="text-xs text-rose-600 font-bold">
                Please enter a valid 6-digit Pincode.
              </div>
            )}

            <div className="space-y-1.5 text-xs text-gray-600 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Original Products Guaranteed
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-600" /> Pay on delivery available
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" /> Easy 14 days returns & exchanges
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
