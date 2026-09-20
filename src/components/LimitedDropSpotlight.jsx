import React, { useState, useEffect } from 'react';
import { Timer, Zap, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export default function LimitedDropSpotlight({ onBuyProduct, onSelectProduct, products }) {
  // Find a premier product for the spotlight (Zara Studio Vintage Bomber)
  const spotlightItem = products.find(p => p.id === "prod-10") || products.find(p => p.category === "Kurtka & Palto") || products[0];

  // Live countdown timer state (e.g., 07h 42m 19s)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!spotlightItem) return null;

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-black text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: High-Impact Editorial Photo */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-[4/5] max-h-[540px] group">
            <img
              src={spotlightItem.image}
              alt={spotlightItem.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
            />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>KUN TAKLIFI // CHEKLANGAN DROPDAN</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-neutral-700 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-300">Origin: <strong className="text-white uppercase">{spotlightItem.country}</strong></span>
              <span className="text-emerald-400 font-bold">✓ Rasmiy Butik Sertifikati</span>
            </div>
          </div>

          {/* Right: Scarcity, Timer, Description, and Fast Purchase */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              
              {/* Countdown Timer Row */}
              <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-neutral-900 border border-neutral-800 w-fit">
                <Timer className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-mono text-neutral-400 uppercase">Aksiya tugashiga qoldi:</span>
                <div className="flex items-center gap-1 font-mono font-bold text-white text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-800">{String(timeLeft.hours).padStart(2, '0')}s</span>:
                  <span className="px-1.5 py-0.5 rounded bg-neutral-800">{String(timeLeft.minutes).padStart(2, '0')}m</span>:
                  <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-red-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>

              {/* Brand & Name */}
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                {spotlightItem.brand} • {spotlightItem.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-white mb-3 leading-tight">
                {spotlightItem.name}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-6">
                {spotlightItem.description} Ushbu buyum Yevropa rasmiy do'konidan cheklangan 3 nusxada keltirilgan bo'lib, qayta ishlab chiqarilmaydi.
              </p>

              {/* Stock Scarcity Progress Bar */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 mb-6">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-neutral-400">Omborda mavjud:</span>
                  <span className="text-red-400 font-bold">Oxirgi 2 dona qoldi!</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full w-[85%]" />
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl sm:text-3xl font-mono font-black text-white">
                  {new Intl.NumberFormat('uz-UZ').format(spotlightItem.price)} so'm
                </span>
                {spotlightItem.originalPrice && (
                  <span className="text-sm font-mono text-neutral-500 line-through">
                    {new Intl.NumberFormat('uz-UZ').format(spotlightItem.originalPrice)} so'm
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 text-xs font-mono">
                  -15% CHEGIRMA
                </span>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-neutral-300 mb-8">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-white shrink-0" />
                  <span>3 soatda eshikkacha</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                  <span>Kiyib ko'rgach to'lov</span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onBuyProduct(spotlightItem)}
                className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Hoziroq Buyurtma Berish</span>
              </button>

              <button
                onClick={() => {
                  onSelectProduct(spotlightItem);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Batafsil ko'rish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
