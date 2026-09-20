import React from 'react';
import { Sparkles } from 'lucide-react';
import { CLOTHING_CATEGORIES } from '../data/initialProducts';

const CATEGORY_ICONS = {
  "Barchasi": "✦",
  "Futbolkalar": "👕",
  "Shim & Djinsi": "👖",
  "Hudi & Sviter": "🧥",
  "Kurtka & Palto": "🧥",
  "Poyabzal": "👟"
};

export default function StoriesBar({ selectedCategory, onSelectCategory }) {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 my-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-black" />
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-black font-extrabold">
            Kiyim Turlari Bo'yicha Tezkor O'tish
          </h3>
        </div>
        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
          Original Import To'plami
        </span>
      </div>

      {/* Horizontal Carousel of Clothing Types */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        {CLOTHING_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`group flex items-center gap-3 px-5 py-3 rounded-2xl border text-left shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-black text-white border-black shadow-lg scale-105'
                  : 'bg-white hover:bg-neutral-50 border-neutral-200 hover:border-black text-black'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-sm transition-transform group-hover:scale-110 ${
                isSelected
                  ? 'bg-white text-black font-bold'
                  : 'bg-neutral-100 text-black border border-neutral-200'
              }`}>
                {CATEGORY_ICONS[cat] || '✦'}
              </div>

              <div>
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  isSelected ? 'text-white' : 'text-black'
                }`}>
                  {cat}
                </span>
                <span className={`text-[10px] font-mono ${
                  isSelected ? 'text-neutral-300' : 'text-neutral-500'
                }`}>
                  To'plamni ko'rish
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
