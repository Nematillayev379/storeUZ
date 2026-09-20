import React from 'react';
import { Sparkles, ArrowRight, Zap, Check } from 'lucide-react';

export default function LookbookSection({ onSelectProduct, products, onBuyNow }) {
  // Select 3 featured items to form the look
  const topPiece = products.find(p => p.category === "Hudi & Sviter") || products[0];
  const bottomPiece = products.find(p => p.category === "Shim & Djinsi") || products[1];
  const shoePiece = products.find(p => p.category === "Poyabzal") || products[2];

  const outfitItems = [topPiece, bottomPiece, shoePiece].filter(Boolean);

  const totalOutfitPrice = outfitItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-neutral-50 border-t border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">
              STYLIST TAVSIYASI // LOOK OF THE WEEK
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-black uppercase tracking-tight">
              Haftaning Tayyor Obrazi
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-500 max-w-sm">
            Bir-biriga mukammal mos tushuvchi original liboslar to'plami. Alohida yoki to'liq xarid qiling.
          </p>
        </div>

        {/* Lookbook Layout: Main Styled Visual on Left + Shoppable Items on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Full-Body Lookbook Image */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-300 shadow-md aspect-[4/5] max-h-[560px]">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85"
              alt="Haftaning to'liq obrazi"
              className="w-full h-full object-cover object-top"
            />
            
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-black text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md">
                TAYYOR LOOK // 3 TA ELEMENT
              </span>
            </div>

            <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-white/95 backdrop-blur-sm border border-neutral-200 flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Obrazning umumiy narxi:</span>
                <span className="text-base font-extrabold font-mono text-black">
                  {new Intl.NumberFormat('uz-UZ').format(totalOutfitPrice)} so'm
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                ✓ Barchasi omborda bor
              </span>
            </div>
          </div>

          {/* Shoppable Items Grid (3 individual items in the look) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Ushbu obrazdagi liboslar:
            </span>

            <div className="space-y-3">
              {outfitItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-black transition-all shadow-sm group"
                >
                  <div 
                    onClick={() => {
                      onSelectProduct(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 rounded-lg object-cover shrink-0 border border-neutral-200 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                        {item.brand} • {item.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-black truncate group-hover:underline">
                        {item.name}
                      </h4>
                      <div className="text-xs font-mono font-extrabold text-black mt-1">
                        {new Intl.NumberFormat('uz-UZ').format(item.price)} so'm
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onSelectProduct(item);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-mono font-bold transition-colors cursor-pointer hidden sm:inline-block"
                    >
                      Ko'rish
                    </button>
                    <button
                      onClick={() => onBuyNow(item)}
                      className="px-3 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold transition-colors shadow-sm cursor-pointer flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3 fill-white" />
                      <span>Xarid</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600 flex items-center justify-between">
              <span>Barcha liboslar birga Toshkent bo'ylab 3 soatda yetkaziladi</span>
              <span className="font-bold text-black">Bepul Kuryer</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
