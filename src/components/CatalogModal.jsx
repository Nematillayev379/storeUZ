import React, { useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { CLOTHING_CATEGORIES } from '../data/initialProducts';

const CATEGORY_DETAILS = {
  "Barchasi": {
    icon: "✦",
    title: "Barcha Liboslar",
    desc: "Do'kondagi mavjud barcha import to'plamlar",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
    tags: ["Yangi drop", "Omborda bor", "Avia-kargo"]
  },
  "Futbolkalar": {
    icon: "👕",
    title: "Futbolkalar & Pololar",
    desc: "Og'ir paxtali boxy-fit va premium vintage futbolkalar",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    tags: ["Boxy Fit", "240 GSM", "Heavyweight"]
  },
  "Shim & Djinsi": {
    icon: "👖",
    title: "Shimlar & Djinsilar",
    desc: "Keng bichimli Baggy denim va zamonaviy plisse shimlar",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",
    tags: ["Baggy Denim", "Wide-Leg", "Pleated"]
  },
  "Hudi & Sviter": {
    icon: "🧥",
    title: "Hudilar & Sviterlar",
    desc: "Issiq qalin fleece hudilar va nozik kashmir to'qimalar",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    tags: ["Fleece 380g", "Cashmere", "Oversize"]
  },
  "Kurtka & Palto": {
    icon: "🧥",
    title: "Kurtkalar & Paltolar",
    desc: "Vintage bomberlar, jun matoli paltolar va yengil kurtkalar",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    tags: ["Vintage Bomber", "Wool Coat", "Kuz/Qish"]
  },
  "Poyabzal": {
    icon: "👟",
    title: "Poyabzallar & Krossovkalar",
    desc: "Original charm krossovkalar va retro modellar",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80",
    tags: ["Retro 550", "Original Box", "AQSH"]
  }
};

export default function CatalogModal({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  products
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-6 overflow-y-auto animate-fade-in">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Catalog Mega-Menu Template */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 my-4 text-black">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm">
              ☰
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display tracking-wide uppercase text-black">
                Kiyim Turlari Katalogi
              </h2>
              <p className="text-xs font-mono text-neutral-500">
                O'zingizga kerakli kiyim toifasini tanlang
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Grid (Katalog Shabloni) */}
        <div className="p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-h-[calc(85vh-140px)] overflow-y-auto">
          {CLOTHING_CATEGORIES.map((cat) => {
            const info = CATEGORY_DETAILS[cat] || {
              icon: "✦",
              title: cat,
              desc: "Original sifatdagi kiyimlar",
              image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
              tags: []
            };

            const count = cat === "Barchasi" 
              ? products.filter(p => p.stock > 0).length 
              : products.filter(p => p.category === cat && p.stock > 0).length;

            const isCurrent = selectedCategory === cat;

            return (
              <div
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  onClose();
                  const el = document.getElementById('catalogue');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative flex flex-col rounded-xl overflow-hidden border p-4 cursor-pointer transition-all duration-200 ${
                  isCurrent
                    ? 'border-black bg-neutral-50 shadow-md ring-2 ring-black'
                    : 'border-neutral-200 hover:border-black hover:shadow-lg bg-white'
                }`}
              >
                <div className="flex items-start gap-4 mb-3">
                  <img
                    src={info.image}
                    alt={info.title}
                    className="w-16 h-20 rounded-lg object-cover shrink-0 border border-neutral-200 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-sm text-black group-hover:underline">
                        {info.title}
                      </span>
                      <span className="text-xs font-mono font-semibold bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">
                        {count} ta
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-2">
                      {info.desc}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {info.tags?.map(t => (
                        <span key={t} className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-mono font-semibold text-black group-hover:translate-x-1 transition-transform">
                  <span>To'plamni ko'rish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-neutral-500">
          <span>Barcha to'plamlar Toshkent omboridan 3 soatda yetkaziladi</span>
          <button
            onClick={() => {
              onSelectCategory("Barchasi");
              onClose();
            }}
            className="text-black font-bold hover:underline"
          >
            Barcha mahsulotlarni ochish ➔
          </button>
        </div>

      </div>

    </div>
  );
}
