import React, { useState } from 'react';
import { 
  Heart, ShoppingBag, Star, Truck, Check, ArrowLeft, Flame, 
  ShieldCheck, RefreshCw, CreditCard, Tag, Sparkles, ChevronRight, 
  ThumbsUp, UserCheck 
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetailPage = ({ product, onBack, onOpenIntentModal, onOpenCheckout }) => {
  const { addToCart, waitlistItems, boardItems, removeFromWaitlist, removeFromBoard } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
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
          <div className="mt-8 border border-gray-200 rounded-sm p-6 space-y-6 bg-white">
            
            {/* Specs Header Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 px-4 font-extrabold text-sm uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'specs' ? 'border-[#ff3f6c] text-[#ff3f6c]' : 'border-transparent text-gray-500 hover:text-[#282c3f]'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 px-4 font-extrabold text-sm uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'details' ? 'border-[#ff3f6c] text-[#ff3f6c]' : 'border-transparent text-gray-500 hover:text-[#282c3f]'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 px-4 font-extrabold text-sm uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews' ? 'border-[#ff3f6c] text-[#ff3f6c]' : 'border-transparent text-gray-500 hover:text-[#282c3f]'
                }`}
              >
                Ratings & Reviews ({product.ratingCount})
              </button>
            </div>

            {/* Specs Tab Content */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-gray-400 block text-sm">Fabric</span>
                  <span className="font-bold text-[#282c3f]">100% Pure Cotton</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Fit</span>
                  <span className="font-bold text-[#282c3f]">Regular Fit</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Pattern</span>
                  <span className="font-bold text-[#282c3f]">Solid / Tipped Collar</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Sleeve Length</span>
                  <span className="font-bold text-[#282c3f]">Short Sleeves</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Collar</span>
                  <span className="font-bold text-[#282c3f]">Polo Collar</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Wash Care</span>
                  <span className="font-bold text-[#282c3f]">Machine Wash Cold</span>
                </div>
              </div>
            )}

            {/* Details Tab Content */}
            {activeTab === 'details' && (
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>
                  Elevate your everyday casual wardrobe with this premium polo t-shirt from <span className="font-bold text-[#282c3f]">{product.brand}</span>. Crafted from breathable, long-staple combed cotton fabric for all-day comfort and durability.
                </p>
                <ul className="list-disc pl-4 space-y-1 pt-1 text-gray-700">
                  <li>Features rib-knit collar and sleeve cuffs with contrasting tip detail.</li>
                  <li>Classic two-button placket with reinforced stitching.</li>
                  <li>Side slits for extra mobility and flexible styling.</li>
                </ul>
              </div>
            )}

            {/* Reviews Tab Content */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded">
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#282c3f]">{product.rating} ★</div>
                    <div className="text-sm text-gray-400 font-bold">{product.ratingCount} Verified Buyers</div>
                  </div>
                  <div className="flex-1 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span>5 ★</span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden">
                        <div className="w-[70%] h-full bg-teal-600" />
                      </div>
                      <span className="text-gray-400">70%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>4 ★</span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden">
                        <div className="w-[20%] h-full bg-teal-600" />
                      </div>
                      <span className="text-gray-400">20%</span>
                    </div>
                  </div>
                </div>

                {/* Customer Reviews Snippet */}
                <div className="space-y-3 pt-2">
                  <div className="p-3 border-b border-gray-100 text-sm">
                    <div className="flex items-center gap-2 font-bold text-[#282c3f]">
                      <span className="bg-teal-600 text-white text-xs px-1.5 py-0.2 rounded font-extrabold">4 ★</span>
                      <span>Great fabric and fit!</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">The cotton quality is super soft and the collar shape holds nicely after wash.</p>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-teal-600" /> Rahul M. | Verified Purchase
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Purchase & Intent Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Brand & Title */}
          <div>
            <h1 className="font-extrabold text-2xl text-[#282c3f] uppercase tracking-wide">
              {product.brand}
            </h1>
            <p className="text-lg text-[#535766] mt-1 font-normal">
              {product.title}
            </p>

            {/* Rating Badge Pill matching Official PDP */}
            <div className="mt-3 inline-flex items-center gap-1.5 border border-gray-300 rounded px-2.5 py-1 text-sm font-bold text-[#282c3f]">
              <span>{product.rating}</span>
              <Star className="w-3.5 h-3.5 fill-teal-600 text-teal-600" />
              <span className="text-gray-400 font-normal">| {product.ratingCount} Ratings</span>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Pricing Row */}
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-[#282c3f]">
                ₹{product.price}
              </span>
              <span className="text-lg text-gray-400 line-through font-normal">
                MRP ₹{product.originalPrice}
              </span>
              <span className="text-lg font-extrabold text-[#ff905a]">
                ({product.discountPercent}% OFF)
              </span>
            </div>
            <div className="text-sm font-bold text-[#03a685] mt-1">
              inclusive of all taxes
            </div>
          </div>

          {/* Best Offers Banner */}
          <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-sm space-y-2 text-sm">
            <div className="flex items-center gap-1.5 font-extrabold text-[#282c3f] uppercase">
              <Tag className="w-4 h-4 text-[#ff905a]" /> Best Offer Price
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-[#ff3f6c]">₹{Math.round(product.price * 0.9)}</span>
              <span className="text-sm text-gray-600">with Code <span className="font-mono font-bold bg-white px-1.5 py-0.5 border border-orange-300 rounded">MYNTRA100</span></span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 pt-1">
              <li className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#03a685]" /> 10% Instant Discount on HDFC Bank Credit Cards.
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#03a685]" /> 15% Cashback up to ₹150 on Paytm UPI transactions.
              </li>
            </ul>
          </div>

          {/* Color Variant Selector */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#282c3f] mb-2.5">
              More Colors
            </h4>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-14 h-16 rounded border-2 overflow-hidden cursor-pointer transition-all ${
                    selectedColor === color ? 'border-[#ff3f6c] shadow-sm' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={product.image} alt={color} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Size Selector with Urgency Indicator */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#282c3f]">
                Select Size
              </h4>
              <button className="text-sm font-bold text-[#ff3f6c] uppercase hover:underline cursor-pointer">
                Size Chart &gt;
              </button>
            </div>

            <div className="flex gap-3">
              {product.availableSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full border text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'border-[#ff3f6c] text-[#ff3f6c] bg-pink-50 shadow-xs'
                      : 'border-gray-300 text-[#282c3f] hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            
            <div className="mt-2 text-sm font-bold text-[#ff905a] flex items-center gap-1">
              <span>⚡ Fast-selling size: Only {product.stockCount || 5} units left in {selectedSize}!</span>
            </div>
          </div>

          {/* Primary Action Buttons: ADD TO BAG & WISHLIST */}
          <div className="flex items-center gap-4 pt-2">
            
            {/* ADD TO BAG */}
            <button
              onClick={handleAddToBag}
              className="flex-1 py-4 bg-[#ff3f6c] hover:bg-[#e6335c] text-white font-extrabold text-base uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 fill-white" />
              <span>Add to Bag</span>
            </button>

            {/* WISHLIST (Triggers Two-Tier Intent Save Architecture) */}
            <button
              onClick={handleWishlistButtonClick}
              className={`flex-1 py-4 font-extrabold text-base uppercase tracking-wider rounded border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isWaitlisted
                  ? 'bg-[#ff3f6c] text-white border-[#ff3f6c]'
                  : isBoardSaved
                  ? 'bg-purple-700 text-white border-purple-700'
                  : 'bg-white border-gray-300 text-[#282c3f] hover:border-gray-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWaitlisted || isBoardSaved ? 'fill-current' : ''}`} />
              <span>
                {isWaitlisted ? `Waitlist Active (${selectedSize})` : isBoardSaved ? 'Saved to Board' : 'Wishlist'}
              </span>
            </button>

          </div>

          {/* Delivery & Pincode Options Section */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-sm uppercase tracking-wider text-[#282c3f]">
              <Truck className="w-4 h-4 text-[#ff3f6c]" /> Delivery Options
            </div>

            <div className="flex items-center border border-gray-300 rounded overflow-hidden max-w-xs">
              <input
                type="text"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="px-3 py-2 text-sm text-[#282c3f] flex-1 focus:outline-none"
              />
              <button
                onClick={handleCheckPincode}
                className="px-4 py-2 text-sm font-bold text-[#ff3f6c] hover:bg-gray-50 uppercase border-l border-gray-200 cursor-pointer"
              >
                Check
              </button>
            </div>

            {pincodeStatus === 'success' && (
              <div className="text-sm text-[#03a685] font-bold space-y-1">
                <div className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Delivery available to {pincode}
                </div>
                <div className="text-gray-600 font-normal">Get it by <span className="font-bold text-[#282c3f]">Tomorrow, 4:00 PM</span></div>
              </div>
            )}

            {pincodeStatus === 'error' && (
              <div className="text-sm text-rose-600 font-bold">
                Please enter a valid 6-digit pincode.
              </div>
            )}
          </div>

          {/* Guarantees & Policy List */}
          <div className="pt-4 border-t border-gray-200 space-y-2.5 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#03a685]" />
              <div>
                <span className="font-bold text-[#282c3f] block">100% Original Products</span>
                <span className="text-sm text-gray-500">Sourced directly from official brand distributors</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-purple-600" />
              <div>
                <span className="font-bold text-[#282c3f] block">Easy 14 Days Returns & Exchanges</span>
                <span className="text-sm text-gray-500">Hassle-free doorstep pickup</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <span className="font-bold text-[#282c3f] block">Pay on Delivery Available</span>
                <span className="text-sm text-gray-500">Cash, UPI, or Card on delivery</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
