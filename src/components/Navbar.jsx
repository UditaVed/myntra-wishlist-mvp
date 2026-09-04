import React, { useState } from 'react';
import { Heart, ShoppingBag, User, Search, Bell } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const Navbar = ({ 
  currentTab, 
  setCurrentTab,
  onToggleNotifications 
}) => {
  const { waitlistItems, boardItems, cartItems, notifications, selectedCategory, setSelectedCategory } = useWishlist();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [imageError, setImageError] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const totalWishlistCount = waitlistItems.length + boardItems.length;

  const categories = [
    { name: 'MEN', key: 'MEN', activeBorder: 'border-blue-600', hoverBorder: 'hover:border-blue-600' },
    { name: 'WOMEN', key: 'WOMEN', activeBorder: 'border-[#ff3f6c]', hoverBorder: 'hover:border-[#ff3f6c]' },
    { name: 'KIDS', key: 'KIDS', activeBorder: 'border-orange-500', hoverBorder: 'hover:border-orange-500' },
    { name: 'HOME', key: 'HOME', activeBorder: 'border-amber-400', hoverBorder: 'hover:border-amber-400' },
    { name: 'BEAUTY', key: 'BEAUTY', activeBorder: 'border-teal-500', hoverBorder: 'hover:border-teal-500' },
    { name: 'GENZ', key: 'GENZ', activeBorder: 'border-teal-400', hoverBorder: 'hover:border-teal-400' },
    { name: 'STUDIO', key: 'STUDIO', badge: 'NEW', activeBorder: 'border-[#ff3f6c]', hoverBorder: 'hover:border-[#ff3f6c]' }
  ];

  const megaMenuData = {
    MEN: [
      {
        title: "Topwear",
        color: "text-blue-600",
        items: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Sweatshirts", "Jackets", "Blazers & Coats", "Suits"]
      },
      {
        title: "Bottomwear",
        color: "text-blue-600",
        items: ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers"]
      },
      {
        title: "Footwear",
        color: "text-blue-600",
        items: ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops"]
      },
      {
        title: "Personal Care & Grooming",
        color: "text-blue-600",
        items: ["Trimmers", "Fragrances", "Skincare", "Beard Care", "Hair Styling"]
      },
      {
        title: "Accessories",
        color: "text-blue-600",
        items: ["Wallets", "Belts", "Sunglasses", "Watches", "Backpacks", "Caps & Hats"]
      }
    ],
    WOMEN: [
      {
        title: "Indian & Fusion Wear",
        color: "text-[#ff3f6c]",
        items: ["Kurtas & Suits", "Kurtis", "Sarees", "Ethnic Dresses", "Leggings & Churidars", "Lehenga Cholis"]
      },
      {
        title: "Western Wear",
        color: "text-[#ff3f6c]",
        items: ["Dresses", "Tops & Shirts", "Jeans", "Trousers & Capris", "Skirts & Shorts", "Co-ords", "Jumpsuits"]
      },
      {
        title: "Lingerie & Sleepwear",
        color: "text-[#ff3f6c]",
        items: ["Bras & Briefs", "Shapewear", "Nightwear & Loungewear", "Camisoles"]
      },
      {
        title: "Footwear",
        color: "text-[#ff3f6c]",
        items: ["Flats & Sandals", "Heels", "Boots", "Casual Shoes", "Sports Shoes"]
      },
      {
        title: "Beauty & Makeup",
        color: "text-[#ff3f6c]",
        items: ["Lipstick", "Skincare", "Haircare", "Fragrances", "Handbags & Clutches"]
      }
    ],
    KIDS: [
      {
        title: "Boys Clothing",
        color: "text-orange-500",
        items: ["T-Shirts", "Shirts", "Shorts", "Jeans", "Ethnic Wear", "Track Pants"]
      },
      {
        title: "Girls Clothing",
        color: "text-orange-500",
        items: ["Dresses", "Tops & Tees", "Skirts & Shorts", "Ethnic Wear", "Tights & Leggings"]
      },
      {
        title: "Footwear",
        color: "text-orange-500",
        items: ["Casual Shoes", "Sports Shoes", "Flip Flops", "Sandals", "School Shoes"]
      },
      {
        title: "Toys & Activity",
        color: "text-orange-500",
        items: ["Action Figures", "Soft Toys", "Board Games", "School Bags"]
      },
      {
        title: "Infants (0-24M)",
        color: "text-orange-500",
        items: ["Rompers & Onesies", "Clothing Sets", "Baby Footwear", "Baby Care"]
      }
    ],
    HOME: [
      {
        title: "Bed Linen & Furnishing",
        color: "text-amber-500",
        items: ["Bedsheets", "Blankets & Quilts", "Pillows & Covers", "Curtains", "Cushion Covers"]
      },
      {
        title: "Flooring & Mats",
        color: "text-amber-500",
        items: ["Carpets & Rugs", "Door Mats", "Floor Mats", "Runner Rugs"]
      },
      {
        title: "Bath Essentials",
        color: "text-amber-500",
        items: ["Bath Towels", "Hand & Face Towels", "Bath Robes", "Bathroom Accessories"]
      },
      {
        title: "Lamps & Lighting",
        color: "text-amber-500",
        items: ["Floor Lamps", "Table Lamps", "Wall Lights", "String Lights"]
      },
      {
        title: "Home Décor",
        color: "text-amber-500",
        items: ["Vases & Planters", "Wall Art & Frames", "Wall Clocks", "Aroma Candles & Diffusers"]
      }
    ],
    BEAUTY: [
      {
        title: "Makeup",
        color: "text-teal-600",
        items: ["Lipstick", "Foundation & Concealer", "Mascara & Eyeliner", "Nail Polish", "Blush & Highlighter"]
      },
      {
        title: "Skincare",
        color: "text-teal-600",
        items: ["Face Wash & Cleanser", "Moisturizer", "Sunscreen", "Face Serums", "Sheet Masks"]
      },
      {
        title: "Haircare",
        color: "text-teal-600",
        items: ["Shampoo & Conditioner", "Hair Oils", "Hair Serums", "Hair Styling Gels"]
      },
      {
        title: "Fragrances",
        color: "text-teal-600",
        items: ["Perfumes (EDP/EDT)", "Deodorants", "Body Mists", "Solid Perfumes"]
      },
      {
        title: "Appliances & Tools",
        color: "text-teal-600",
        items: ["Hair Dryers", "Hair Straighteners", "Facial Massagers", "Makeup Brushes"]
      }
    ],
    GENZ: [
      {
        title: "Streetwear Fits",
        color: "text-purple-600",
        items: ["Oversized Tees", "Cargo Pants", "Graphic Hoodies", "Baggy Jeans"]
      },
      {
        title: "Y2K & Trendy",
        color: "text-purple-600",
        items: ["Crop Tops", "Wide Leg Trousers", "Parachute Pants", "Corset Tops"]
      },
      {
        title: "Footwear & Kicks",
        color: "text-purple-600",
        items: ["Chunky Sneakers", "High-Top Canvas", "Platform Slides", "Retro Runners"]
      },
      {
        title: "GenZ Accessories",
        color: "text-purple-600",
        items: ["Tote Bags", "Bucket Hats", "Chunky Chains", "Y2K Sunglasses", "Beaded Jewellery"]
      },
      {
        title: "Gender Neutral",
        color: "text-purple-600",
        items: ["Unisex Hoodies", "Oversized Shirts", "Unisex Joggers", "Statement Jackets"]
      }
    ],
    STUDIO: [
      {
        title: "Celebrity Styles",
        color: "text-[#ff3f6c]",
        items: ["Red Carpet Looks", "Airport Spotting", "Festive Celebrations", "Bollywood Trends"]
      },
      {
        title: "Style Guides",
        color: "text-[#ff3f6c]",
        items: ["Workwear Chic", "Weekend Casual", "Party & Night Out", "Minimalist Closet"]
      },
      {
        title: "Influencer Picks",
        color: "text-[#ff3f6c]",
        items: ["Top Trending Outfits", "Weekly Bestsellers", "Creator Lookbooks"]
      },
      {
        title: "Editorials",
        color: "text-[#ff3f6c]",
        items: ["Seasonal Trend Reports", "Fashion Week Recaps", "Sustainable Fashion Spotlights"]
      },
      {
        title: "Exclusive Drops",
        color: "text-[#ff3f6c]",
        items: ["Designer Collabs", "Limited Edition Capsule", "Monochrome Edit"]
      }
    ]
  };

  const handleCategoryClick = (catKey) => {
    setSelectedCategory(catKey);
    setCurrentTab('catalog');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-md shadow-gray-200/60 relative transition-shadow">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. Guaranteed Bulletproof Myntra Logo & Category Links */}
          <div className="flex items-center gap-6 xl:gap-8">
            <button 
              onClick={() => { setSelectedCategory('MEN'); setCurrentTab('catalog'); }}
              className="flex items-center cursor-pointer focus:outline-none flex-shrink-0 hover:opacity-90 transition-opacity"
              title="Myntra Home"
            >
              {!imageError ? (
                <img
                  src="/images.png"
                  alt="Myntra Logo"
                  onError={() => setImageError(true)}
                  className="w-12 h-9 sm:w-14 sm:h-10 object-contain"
                />
              ) : (
                <svg className="w-12 h-9" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25,65 C10,65 0,50 0,35 C0,15 15,0 35,0 C48,0 55,15 50,30 C35,42 28,55 25,65 Z" fill="#FF3F6C" />
                  <path d="M35,0 C48,0 55,15 50,35 C42,50 30,65 18,65 C28,50 35,35 35,0 Z" fill="#F58220" />
                  <path d="M75,0 C90,0 100,15 100,35 C100,50 90,65 75,65 C68,52 62,38 50,30 C55,15 62,0 75,0 Z" fill="#FF3F6C" />
                  <path d="M75,0 C63,0 55,15 50,30 C62,38 68,52 82,65 C70,65 58,50 50,35 Z" fill="#F58220" />
                </svg>
              )}
            </button>

            {/* Category Nav Links */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-3 text-sm font-bold text-[#282c3f] tracking-wider">
              {categories.map((cat) => {
                const isActive = currentTab === 'catalog' && selectedCategory === cat.key;

                return (
                  <div
                    key={cat.key}
                    onMouseEnter={() => setHoveredCategory(cat.key)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className="relative"
                  >
                    <button 
                      onClick={() => handleCategoryClick(cat.key)}
                      className={`px-3 lg:px-4 py-6 lg:py-7 border-b-[4px] transition-all whitespace-nowrap cursor-pointer relative flex items-center justify-center gap-1 text-[#282c3f] ${
                        isActive 
                          ? `${cat.activeBorder}` 
                          : `border-transparent ${cat.hoverBorder}`
                      }`}
                    >
                      <span>{cat.name}</span>
                      {cat.badge && (
                        <span className="text-[9px] text-[#ff3f6c] font-bold uppercase tracking-tighter leading-none -mt-2 ml-0.5">
                          {cat.badge}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* 2. Search Bar */}
          <div className="hidden md:flex flex-1 max-w-[380px] lg:max-w-[420px] ml-4 mr-6 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#696e79]">
              <Search className="w-4 h-4 stroke-[2]" />
            </div>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full pl-11 pr-4 py-2.5 bg-[#f5f5f6] border border-transparent rounded-md text-xs sm:text-sm text-[#282c3f] placeholder-[#696e79] focus:bg-white focus:border-gray-300 focus:outline-none transition-all shadow-2xs font-normal"
            />
          </div>

          {/* 3. Action Icons */}
          <div className="flex items-center space-x-5 lg:space-x-7 text-[#282c3f] flex-shrink-0">
            
            {/* Profile */}
            <div className="hidden sm:flex flex-col items-center cursor-pointer hover:text-[#ff3f6c] transition-colors">
              <User className="w-5 h-5 stroke-[1.5]" />
              <span className="text-[11px] font-semibold mt-1">Profile</span>
            </div>

            {/* Alerts */}
            <button
              onClick={onToggleNotifications}
              className="relative flex flex-col items-center hover:text-[#ff3f6c] transition-colors cursor-pointer"
              title="Waitlist Push Notifications"
            >
              <Bell className="w-5 h-5 stroke-[1.5]" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff3f6c] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                  {unreadNotifs}
                </span>
              )}
              <span className="text-[11px] font-semibold mt-1 hidden sm:block">Alerts</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setCurrentTab('wishlist')}
              className={`relative flex flex-col items-center hover:text-[#ff3f6c] transition-colors cursor-pointer ${
                currentTab === 'wishlist' ? 'text-[#ff3f6c]' : ''
              }`}
              title="Wishlist Hub"
            >
              <Heart className={`w-5 h-5 stroke-[1.5] ${currentTab === 'wishlist' ? 'fill-[#ff3f6c] text-[#ff3f6c]' : ''}`} />
              {totalWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff3f6c] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalWishlistCount}
                </span>
              )}
              <span className="text-[11px] font-semibold mt-1 hidden sm:block">Wishlist</span>
            </button>

            {/* Bag */}
            <button
              onClick={() => setCurrentTab('cart')}
              className={`relative flex flex-col items-center hover:text-[#ff3f6c] transition-colors cursor-pointer ${
                currentTab === 'cart' ? 'text-[#ff3f6c]' : ''
              }`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff3f6c] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <span className="text-[11px] font-semibold mt-1 hidden sm:block">Bag</span>
            </button>

          </div>

        </div>
      </div>

      {/* Dynamic Hover Mega Menu Dropdown */}
      {hoveredCategory && megaMenuData[hoveredCategory] && (
        <div 
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
          className="absolute top-full left-0 right-0 bg-white border-t border-b border-gray-200 shadow-2xl z-50 animate-fade-in"
        >
          <div className="max-w-[1440px] mx-auto px-12 py-8 grid grid-cols-5 gap-8 text-xs">
            {megaMenuData[hoveredCategory].map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h5 className={`font-bold text-xs ${col.color} uppercase tracking-wider`}>
                  {col.title}
                </h5>
                <ul className="space-y-2 text-gray-700 font-normal text-xs">
                  {col.items.map((item, itemIdx) => (
                    <li 
                      key={itemIdx} 
                      onClick={() => { 
                        setSelectedCategory(hoveredCategory); 
                        setHoveredCategory(null); 
                        setCurrentTab('catalog'); 
                      }}
                      className="hover:font-semibold hover:text-[#282c3f] cursor-pointer transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

    </header>
  );
};
