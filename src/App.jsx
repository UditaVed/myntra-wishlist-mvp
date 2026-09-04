import React, { useState } from 'react';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { Navbar } from './components/Navbar';
import { SidebarFilters } from './components/SidebarFilters';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { IntentModal } from './components/IntentModal';
import { WishlistHub } from './components/WishlistHub';
import { NotificationDrawer } from './components/NotificationDrawer';
import { SimulatorPanel } from './components/SimulatorPanel';
import { CheckoutModal } from './components/CheckoutModal';
import { TelemetryDashboard } from './components/TelemetryDashboard';
import { Sliders, BarChart3, ChevronDown, ShoppingBag } from 'lucide-react';

const MainApp = () => {
  const { products, cartItems, notifications, selectedCategory } = useWishlist();

  // Navigation State
  const [currentTab, setCurrentTab] = useState('catalog');
  const [selectedProductForPDP, setSelectedProductForPDP] = useState(null);
  const [selectedProductForIntent, setSelectedProductForIntent] = useState(null);
  const [checkoutState, setCheckoutState] = useState(null);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleOpenPDP = (product) => {
    setSelectedProductForPDP(product);
    setCurrentTab('pdp');
  };

  const handleOpenCheckout = (product, size, color, price) => {
    setCheckoutState({ product, size, color, price });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#282c3f] select-none">
      
      {/* Exact Pixel-Perfect Myntra Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'catalog') setSelectedProductForPDP(null);
        }}
        onToggleNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* Product Detail Page View (PDP) */}
        {currentTab === 'pdp' && selectedProductForPDP && (
          <ProductDetailPage
            product={selectedProductForPDP}
            onBack={() => setCurrentTab('catalog')}
            onOpenIntentModal={(prod) => setSelectedProductForIntent(prod)}
            onOpenCheckout={handleOpenCheckout}
          />
        )}

        {/* Catalog View with 30+ Items Per Category */}
        {currentTab === 'catalog' && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 font-normal mb-1">
              Home / Clothing / <span className="font-extrabold text-[#282c3f]">{selectedCategory} Collection</span>
            </div>

            <div className="text-[#282c3f] font-bold text-sm mb-4">
              {selectedCategory} Clothing & Lifestyle <span className="text-gray-400 font-normal text-xs">- {products.length} items</span>
            </div>

            {/* Filter Toolbar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-200 text-xs">
              
              {/* Left Column FILTERS Header */}
              <div className="w-60 flex-shrink-0">
                <span className="font-bold text-sm uppercase tracking-wider text-[#282c3f]">
                  FILTERS
                </span>
              </div>

              {/* Center Horizontal Filter Tags */}
              <div className="flex-1 hidden md:flex items-center gap-5 text-gray-600 font-medium text-xs pl-2">
                <button className="flex items-center gap-1 hover:text-[#282c3f] cursor-pointer">
                  <span>Add-Ons</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button className="flex items-center gap-1 hover:text-[#282c3f] cursor-pointer">
                  <span>Bundles</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button className="flex items-center gap-1 hover:text-[#282c3f] cursor-pointer">
                  <span>Collar</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button className="flex items-center gap-1 hover:text-[#282c3f] cursor-pointer">
                  <span>Country of Origin</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button className="flex items-center gap-1 hover:text-[#282c3f] cursor-pointer">
                  <span>Fabrics</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button className="flex items-center gap-1 hover:text-[#282c3f] cursor-pointer">
                  <span>Fashion Trends</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button className="flex items-center gap-1 hover:text-[#282c3f] cursor-pointer">
                  <span>Features</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <span className="font-bold text-[#ff3f6c] cursor-pointer hover:underline">+ 20 more</span>
              </div>

              {/* Right Sort Dropdown */}
              <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white text-xs text-[#282c3f] cursor-pointer hover:border-gray-400">
                <span className="text-gray-500">Sort by :</span>
                <span className="font-bold">Recommended</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-500" />
              </div>
            </div>

            {/* Sidebar + Product Grid Container */}
            <div className="flex items-start">
              
              {/* Left Sidebar Filters */}
              <SidebarFilters />

              {/* 5-Column Borderless Product Grid */}
              <div className="flex-1 md:pl-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
                  {products.map(product => (
                    <div key={product.id} onClick={() => handleOpenPDP(product)}>
                      <ProductCard
                        product={product}
                        onSelectIntent={(p) => setSelectedProductForIntent(p)}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Wishlist Hub View */}
        {currentTab === 'wishlist' && (
          <WishlistHub
            onOpenCheckout={handleOpenCheckout}
            onSwitchToCatalog={() => setCurrentTab('catalog')}
          />
        )}

        {/* Shopping Bag View */}
        {currentTab === 'cart' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-xl font-bold text-[#282c3f] mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#ff3f6c]" /> Shopping Bag ({cartItems.length})
            </h1>

            {cartItems.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-base font-bold text-[#282c3f]">Your Shopping Bag is empty</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Use the Waitlist Checkout Bypass flow or browse the catalog to add items.
                </p>
                <button
                  onClick={() => setCurrentTab('catalog')}
                  className="mt-6 px-6 py-2.5 bg-[#ff3f6c] text-white text-xs font-extrabold uppercase rounded shadow-xs hover:bg-[#e6335c] transition-colors"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 border border-gray-200 rounded flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-[#282c3f]">Product ID: {item.productId}</div>
                      <div className="text-xs text-gray-500">Variant: {item.selectedSize} | {item.selectedColor}</div>
                    </div>
                    <div className="text-base font-black text-[#ff3f6c]">Rs. {item.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Floating Demo Control Chips */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsTelemetryOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-pink-50 hover:bg-pink-100 text-[#ff3f6c] border border-pink-200 rounded-full text-xs font-extrabold shadow-md transition-all cursor-pointer"
          title="Open Telemetry KPI Dashboard"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Telemetry</span>
        </button>

        {!isSimulatorOpen && (
          <button
            onClick={() => setIsSimulatorOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#282c3f] hover:bg-gray-800 text-white rounded-full text-xs font-extrabold shadow-md transition-all cursor-pointer"
            title="Open Event Simulator"
          >
            <Sliders className="w-3.5 h-3.5 text-[#ff905a]" />
            <span>Simulator</span>
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#282c3f] text-gray-400 text-xs py-8 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <div className="font-extrabold text-white uppercase tracking-widest text-xs">
            Myntra Wishlist Conversion Engine MVP
          </div>
          <p className="text-gray-400 max-w-lg mx-auto text-[11px]">
            Frontend Proof-of-Concept for Two-Tier Save Architecture, Algorithmic Price/Inventory Alerts, and 14-Day Micro-Discounts.
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {selectedProductForIntent && (
        <IntentModal
          product={selectedProductForIntent}
          onClose={() => setSelectedProductForIntent(null)}
        />
      )}

      {checkoutState && (
        <CheckoutModal
          product={checkoutState.product}
          selectedSize={checkoutState.size}
          selectedColor={checkoutState.color}
          price={checkoutState.price}
          onClose={() => setCheckoutState(null)}
        />
      )}

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onOpenCheckout={handleOpenCheckout}
      />

      <SimulatorPanel
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />

      <TelemetryDashboard
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <WishlistProvider>
      <MainApp />
    </WishlistProvider>
  );
}
