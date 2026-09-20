import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const COLLECTIONS = [
  {
    id: "streetwear",
    title: "Streetwear & Hoodies",
    category: "Hudi & Sviter",
    tag: "TURKIYA 460 GSM",
    desc: "Zich to'qilgan fleece mato, oversize bichim va qulaylik",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    itemCount: "4 xil model"
  },
  {
    id: "denim",
    title: "Baggy Denim & Pants",
    category: "Shim & Djinsi",
    tag: "YEVROPA FASONLARI",
    desc: "Keng tushuvchi vintage djinsilar va qulay kargo shimlar",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80",
    itemCount: "4 xil model"
  },
  {
    id: "outerwear",
    title: "Kurtkalar & Issiq Palto",
    category: "Kurtka & Palto",
    tag: "ITALIYA & DUBAI",
    desc: "Shamoldan himoyalovchi bomberlar va jun palto modellar",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
    itemCount: "3 xil model"
  },
  {
    id: "sneakers",
    title: "Limited Poyabzal",
    category: "Poyabzal",
    tag: "ORIGINAL BARCHASI",
    desc: "Klassik retro krossovkalar va qulay charm slip-onlar",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    itemCount: "3 xil model"
  }
];

export default function CuratedCollections({ onSelectCategory, onScrollToCatalogue }) {
  const handleClick = (category) => {
    onSelectCategory(category);
    if (onScrollToCatalogue) {
      onScrollToCatalogue();
    }
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-neutral-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold">
                SARALANGAN TO'PLAMLAR // CURATED CAPSULES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black uppercase tracking-tight">
              Toifalar Bo'yicha Xarid
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-500 max-w-sm sm:text-right">
            O'zingizga ma'qul uslubni tanlang — to'plamlar muntazam yangilanib boriladi.
          </p>
        </div>

        {/* 4 Large Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => handleClick(col.category)}
              className="group relative h-[360px] sm:h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-neutral-200 hover:border-black transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between p-6"
            >
              {/* Background Photo with Zoom on hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-95"
                />
                {/* Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              </div>

              {/* Top Tag & Item Count */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                  {col.tag}
                </span>
                <span className="text-[11px] font-mono text-neutral-300 font-semibold">
                  {col.itemCount}
                </span>
              </div>

              {/* Bottom Content & Action */}
              <div className="relative z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase mb-1.5 leading-tight group-hover:underline">
                  {col.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light line-clamp-2 mb-4 leading-relaxed">
                  {col.desc}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-white group-hover:text-neutral-200 transition-colors">
                  <span>To'plamni ko'rish</span>
                  <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
