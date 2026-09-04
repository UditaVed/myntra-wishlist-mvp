import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/mockProducts';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('MEN');

  const [boardItems, setBoardItems] = useState(() => {
    const saved = localStorage.getItem('myntra_mvp_board');
    return saved ? JSON.parse(saved) : [
      { id: 'b-1', productId: 'men-1', addedAt: new Date().toISOString() }
    ];
  });

  const [waitlistItems, setWaitlistItems] = useState(() => {
    const saved = localStorage.getItem('myntra_mvp_waitlist');
    return saved ? JSON.parse(saved) : [
      {
        id: 'w-1',
        productId: 'men-2',
        selectedSize: 'M',
        selectedColor: 'Blue',
        addedPrice: 683,
        addedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        discountCoupon: {
          code: 'WAITLIST10-MEN2',
          percent: 10,
          discountedPrice: 615,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      }
    ];
  });

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('myntra_mvp_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('myntra_mvp_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'n-1',
        title: '🔥 14-Day Waitlist Perk Unlocked!',
        message: 'Nautica Slim Fit Casual Shirt has been on your Waitlist for 14 days. Enjoy an extra 10% off for 24h!',
        type: 'MICRO_DISCOUNT',
        productId: 'men-2',
        timestamp: new Date().toISOString(),
        read: false
      }
    ];
  });

  const [metrics, setMetrics] = useState(() => {
    const saved = localStorage.getItem('myntra_mvp_metrics');
    return saved ? JSON.parse(saved) : {
      totalWishlistActions: 12,
      waitlistSaves: 8,
      boardSaves: 4,
      cartConversions: 3,
      notificationClicks: 5,
      totalCheckoutFastTracks: 2
    };
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('myntra_mvp_board', JSON.stringify(boardItems));
  }, [boardItems]);

  useEffect(() => {
    localStorage.setItem('myntra_mvp_waitlist', JSON.stringify(waitlistItems));
  }, [waitlistItems]);

  useEffect(() => {
    localStorage.setItem('myntra_mvp_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('myntra_mvp_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('myntra_mvp_metrics', JSON.stringify(metrics));
  }, [metrics]);

  // Actions
  const addToBoard = (productId) => {
    if (boardItems.some(item => item.productId === productId)) return;
    const newItem = {
      id: `b-${Date.now()}`,
      productId,
      addedAt: new Date().toISOString()
    };
    setBoardItems(prev => [newItem, ...prev]);
    setMetrics(prev => ({
      ...prev,
      totalWishlistActions: prev.totalWishlistActions + 1,
      boardSaves: prev.boardSaves + 1
    }));
  };

  const removeFromBoard = (productId) => {
    setBoardItems(prev => prev.filter(item => item.productId !== productId));
  };

  const addToWaitlist = (productId, selectedSize, selectedColor) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if already in waitlist
    if (waitlistItems.some(item => item.productId === productId)) return;

    // If it was in board, move to waitlist
    removeFromBoard(productId);

    const newItem = {
      id: `w-${Date.now()}`,
      productId,
      selectedSize,
      selectedColor,
      addedPrice: product.price,
      addedAt: new Date().toISOString()
    };

    setWaitlistItems(prev => [newItem, ...prev]);
    setMetrics(prev => ({
      ...prev,
      totalWishlistActions: prev.totalWishlistActions + 1,
      waitlistSaves: prev.waitlistSaves + 1
    }));
  };

  const removeFromWaitlist = (productId) => {
    setWaitlistItems(prev => prev.filter(item => item.productId !== productId));
  };

  const moveBoardToWaitlist = (productId, selectedSize, selectedColor) => {
    addToWaitlist(productId, selectedSize, selectedColor);
  };

  const addToCart = (productId, selectedSize, selectedColor, price) => {
    const newItem = {
      id: `cart-${Date.now()}`,
      productId,
      selectedSize,
      selectedColor,
      price: price || 0,
      addedAt: new Date().toISOString()
    };
    setCartItems(prev => [newItem, ...prev]);
    setMetrics(prev => ({
      ...prev,
      cartConversions: prev.cartConversions + 1
    }));
  };

  // Simulator Triggers for Demo
  const triggerPriceDropAlert = () => {
    const targetProduct = products[0];
    if (!targetProduct) return;

    const oldPrice = targetProduct.price;
    const newPrice = Math.round(oldPrice * 0.88); // 12% drop

    setProducts(prev => prev.map(p => p.id === targetProduct.id ? { ...p, price: newPrice, originalPrice: oldPrice } : p));

    const newNotif = {
      id: `n-${Date.now()}`,
      title: '📉 Price Drop Alert!',
      message: `${targetProduct.brand} ${targetProduct.title} dropped from Rs. ${oldPrice} to Rs. ${newPrice}! (Saved in your Waitlist)`,
      type: 'PRICE_DROP',
      productId: targetProduct.id,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
  };

  const triggerRestockAlert = () => {
    const targetProduct = products[1];
    if (!targetProduct) return;

    const newNotif = {
      id: `n-${Date.now()}`,
      title: '⚡ Restock Urgency Alert!',
      message: `Only 2 items left for ${targetProduct.brand} in size ${targetProduct.lowStockSize || 'M'}! Fast track your checkout now.`,
      type: 'RESTOCK',
      productId: targetProduct.id,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
  };

  const triggerFastForward14Days = () => {
    setWaitlistItems(prev => prev.map(item => {
      const product = products.find(p => p.id === item.productId);
      const discountedPrice = Math.round((product?.price || item.addedPrice) * 0.9);
      return {
        ...item,
        addedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        discountCoupon: {
          code: `WAITLIST10-${item.productId.toUpperCase()}`,
          percent: 10,
          discountedPrice,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      };
    }));

    const newNotif = {
      id: `n-${Date.now()}`,
      title: '🎉 14-Day Loyalty Discount Granted!',
      message: 'You unlocked a 24-hour 10% OFF coupon for items in your Waitlist!',
      type: 'MICRO_DISCOUNT',
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
    setMetrics(prev => ({ ...prev, notificationClicks: prev.notificationClicks + 1 }));
  };

  const filteredProducts = products.filter(p => {
    if (!selectedCategory) return true;
    return p.category === selectedCategory;
  });

  return (
    <WishlistContext.Provider value={{
      products: filteredProducts,
      allProducts: products,
      selectedCategory,
      setSelectedCategory,
      boardItems,
      waitlistItems,
      cartItems,
      notifications,
      metrics,
      addToBoard,
      removeFromBoard,
      addToWaitlist,
      removeFromWaitlist,
      moveBoardToWaitlist,
      addToCart,
      triggerPriceDropAlert,
      triggerRestockAlert,
      triggerFastForward14Days,
      markNotificationAsRead
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
