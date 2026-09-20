import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';

const RECENT_PURCHASES = [
  {
    name: "Javohir M.",
    city: "Toshkent, Yunusobod",
    product: "Oversized Heavyweight Hoodie",
    timeAgo: "2 daqiqa oldin",
    size: "XL",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&auto=format&fit=crop&q=80"
  },
  {
    name: "Sardor B.",
    city: "Samarqand shahri",
    product: "Vintage Washed Baggy Jeans",
    timeAgo: "5 daqiqa oldin",
    size: "32",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&auto=format&fit=crop&q=80"
  },
  {
    name: "Bekzod K.",
    city: "Toshkent, Mirzo Ulug'bek",
    product: "Wool Blend Double Coat",
    timeAgo: "8 daqiqa oldin",
    size: "L",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=200&auto=format&fit=crop&q=80"
  },
  {
    name: "Shahzod A.",
    city: "Buxoro",
    product: "Retro Leather Sneakers 550",
    timeAgo: "12 daqiqa oldin",
    size: "42",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&auto=format&fit=crop&q=80"
  }
];

export default function LiveSalesToast({ onSelectProductByTitle }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show after initial 4 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop interval
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 1000);

    }, 22000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isDismissed]);

  // Hide after 6 seconds of display
  useEffect(() => {
    if (isVisible) {
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 6500);
      return () => clearTimeout(hideTimeout);
    }
  }, [isVisible]);

  if (isDismissed || !isVisible) return null;

  const current = RECENT_PURCHASES[currentIndex];

  return (
    <aside aria-label="Jonli buyurtma bildirishnomasi" className="fixed bottom-20 left-3 sm:bottom-5 sm:left-5 z-40 max-w-[290px] sm:max-w-sm w-full animate-fade-in">
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-300 shadow-2xl flex items-center gap-2.5 sm:gap-3 relative group">
        
        {/* Product Image Thumbnail */}
        <div className="relative shrink-0 w-12 h-14 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
          <img
            src={current.image}
            alt={current.product}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 mb-0.5">
            <span className="font-bold text-neutral-800">{current.name}</span>
            <span>({current.city})</span>
          </div>

          <div className="text-xs font-bold text-black truncate">
            {current.product}
          </div>

          <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-emerald-600 font-semibold">
            <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-200">
              O'lcham: {current.size}
            </span>
            <span>• {current.timeAgo}</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-black transition-colors cursor-pointer shrink-0"
          title="Yopish"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </aside>
  );
}
