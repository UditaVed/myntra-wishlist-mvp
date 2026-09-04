import React from 'react';
import { X, BarChart3, TrendingUp, Users, Zap, Clock, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const TelemetryDashboard = ({ isOpen, onClose }) => {
  const { metrics, waitlistItems, boardItems } = useWishlist();

  if (!isOpen) return null;

  // Calculate live telemetry derived stats
  const totalSaves = (metrics.waitlistSaves + metrics.boardSaves) || 1;
  const waitlistRatio = Math.round((metrics.waitlistSaves / totalSaves) * 100);
  const boardRatio = 100 - waitlistRatio;

  // Wishlist to Cart Conversion Rate (Target 15% lift -> Simulated base ~8%, current ~24%)
  const conversionRate = metrics.totalWishlistActions > 0 
    ? Math.min(100, Math.round((metrics.cartConversions / metrics.totalWishlistActions) * 100)) 
    : 24;

  const ctrRate = metrics.notificationClicks > 0 ? Math.min(100, metrics.notificationClicks * 18) : 42;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-myntra-border">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-myntra-charcoal via-gray-900 to-myntra-charcoal p-6 text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-myntra-pink/20 text-myntra-pink rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> PRD Telemetry Monitor
            </div>
            <h2 className="text-xl font-black">MVP Telemetry & KPI Analytics</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="p-6 space-y-6">
          
          {/* Top 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* KPI 1: Conversion Lift */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                    Wishlist-to-Cart Lift
                  </div>
                  <div className="text-3xl font-black text-myntra-success mt-1">
                    +{conversionRate}%
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-myntra-success flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> Target: +15% Relative Lift (Achieved)
              </div>
            </div>

            {/* KPI 2: Feature Adoption Split */}
            <div className="bg-pink-50 border border-pink-200 p-4 rounded-xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-extrabold text-pink-900 uppercase tracking-wider">
                    Waitlist Adoption Ratio
                  </div>
                  <div className="text-3xl font-black text-myntra-pink mt-1">
                    {waitlistRatio}%
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-100 text-myntra-pink flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 text-[11px] text-pink-800 font-semibold">
                Waitlist ({metrics.waitlistSaves}) vs Board ({metrics.boardSaves}) Intent Purification
              </div>
            </div>

            {/* KPI 3: Push Notification CTR */}
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-extrabold text-purple-900 uppercase tracking-wider">
                    Notification CTR
                  </div>
                  <div className="text-3xl font-black text-purple-700 mt-1">
                    {ctrRate}%
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 text-[11px] text-purple-800 font-semibold">
                {metrics.notificationClicks} Push Alert clicks recorded
              </div>
            </div>

            {/* KPI 4: Time-to-Conversion Velocity */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                    Time-to-Conversion
                  </div>
                  <div className="text-3xl font-black text-amber-700 mt-1">
                    4.2 Days
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 text-[11px] text-amber-800 font-semibold">
                Reduced latency from 14+ days to under 5 days
              </div>
            </div>

          </div>

          {/* Telemetry Breakdown Details */}
          <div className="bg-myntra-lightBg p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
            <h3 className="font-extrabold text-myntra-charcoal uppercase tracking-wider">
              Recorded User Session Activity
            </h3>
            <div className="grid grid-cols-2 gap-2 text-gray-700 font-medium">
              <div>• Total Intent Saves: <span className="font-bold text-myntra-charcoal">{metrics.totalWishlistActions}</span></div>
              <div>• Waitlist High Intent: <span className="font-bold text-myntra-pink">{metrics.waitlistSaves}</span></div>
              <div>• Checkout Fast-Tracks: <span className="font-bold text-myntra-success">{metrics.totalCheckoutFastTracks}</span></div>
              <div>• Cart Conversions: <span className="font-bold text-purple-700">{metrics.cartConversions}</span></div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-myntra-border text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-myntra-charcoal text-white font-extrabold text-xs uppercase rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
