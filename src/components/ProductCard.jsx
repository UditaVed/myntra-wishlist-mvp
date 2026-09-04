import React from 'react';
import { Heart, Star, Flame, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product, onSelectIntent }) => {
  const { waitlistItems, boardItems, removeFromWaitlist, removeFromBoard } = useWishlist();

  const waitlistItem = waitlistItems.find(w => w.productId === product.id);
  const boardItem = boardItems.find(b => b.productId === product.id);

  const isWaitlisted = !!waitlistItem;
  const isBoardSaved = !!boardItem;

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (isWaitlisted) {
      removeFromWaitlist(product.id);
    } else if (isBoardSaved) {
      removeFromBoard(product.id);
    } else {
      onSelectIntent(product);
    }
  };

  return (
    <div className="group relative bg-white overflow-hidden flex flex-col cursor-pointer select-none">
      
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#f4f4f5] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* AD Badge */}
        {product.isAd && (
          <div className="absolute top-2 right-2 bg-black/40 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-xs uppercase tracking-wider backdrop-blur-2xs">
            AD
          </div>
        )}

        {/* Rating Pill */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-xs text-[11px] font-bold text-[#282c3f] flex items-center gap-1 shadow-2xs">
          <span>{product.rating}</span>
          <Star className="w-3 h-3 fill-teal-600 text-teal-600" />
          <span className="text-gray-400 font-normal">| {product.ratingCount}</span>
        </div>

        {/* Intent Status Badges */}
        {isWaitlisted ? (
          <div className="absolute top-2 left-2 bg-[#ff3f6c] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs flex items-center gap-1 shadow-sm">
            <Flame className="w-3 h-3" />
            <span>Waitlist: {waitlistItem.selectedSize}</span>
          </div>
        ) : isBoardSaved ? (
          <div className="absolute top-2 left-2 bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-sm">
            Board Saved
          </div>
        ) : null}

        {/* Hover Wishlist Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-md">
          <button
            onClick={handleSaveClick}
            className={`w-full py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-xs border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isWaitlisted
                ? 'bg-[#ff3f6c] text-white border-[#ff3f6c]'
                : isBoardSaved
                ? 'bg-purple-700 text-white border-purple-700'
                : 'bg-white text-[#282c3f] border-gray-300 hover:border-[#ff3f6c] hover:text-[#ff3f6c]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWaitlisted || isBoardSaved ? 'fill-current' : ''}`} />
            <span>
              {isWaitlisted ? 'Waitlist Active' : isBoardSaved ? 'In Visual Board' : 'WISHLIST'}
            </span>
          </button>
        </div>

      </div>

      {/* Product Details (Clean & Balanced Font Weights matching Myntra) */}
      <div className="pt-3 pb-1 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-[#282c3f] tracking-tight truncate">
            {product.brand}
          </h3>
          <p className="text-xs text-[#535766] truncate mt-0.5 font-normal">
            {product.title}
          </p>

          {/* Pricing Row */}
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="font-bold text-xs text-[#282c3f]">
              Rs. {product.price}
            </span>
            <span className="text-[11px] text-[#94969f] line-through font-normal">
              Rs. {product.originalPrice}
            </span>
            <span className="text-[11px] font-bold text-[#ff905a]">
              ({product.discountPercent}% OFF)
            </span>
          </div>
        </div>

        {/* Intent Status Footer */}
        <div className="mt-2 pt-1 border-t border-gray-100 flex items-center justify-between text-[10px]">
          {isWaitlisted ? (
            <span className="text-[#03a685] font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> Waitlist ({waitlistItem.selectedSize})
            </span>
          ) : isBoardSaved ? (
            <span className="text-purple-700 font-bold">Visual Board</span>
          ) : (
            <span className="text-gray-400">Click to view details</span>
          )}
        </div>
      </div>

    </div>
  );
};
