import React from 'react';
import { Camera, Eye } from 'lucide-react';

const COMMUNITY_LOOKS = [
  {
    id: 1,
    city: "Toshkent, Shahrisabz ko'chasi",
    author: "@shohruh.style",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
    productName: "Heavyweight Fleece Hoodie",
    productPrice: "540 000 so'm",
    productId: "prod-7",
    categoryHint: "Hudi & Sviter"
  },
  {
    id: 2,
    city: "Samarqand, Registon",
    author: "@kamol_vibe",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=80",
    productName: "Vintage Washed Baggy Jeans",
    productPrice: "420 000 so'm",
    productId: "prod-4",
    categoryHint: "Shim & Djinsi"
  },
  {
    id: 3,
    city: "Toshkent City Mall",
    author: "@diyor.lookbook",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&auto=format&fit=crop&q=80",
    productName: "Double-Breasted Wool Coat",
    productPrice: "1 450 000 so'm",
    productId: "prod-11",
    categoryHint: "Kurtka & Palto"
  },
  {
    id: 4,
    city: "Buxoro, Eski shahar",
    author: "@azamat.street",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
    productName: "Retro Leather Sneakers 550",
    productPrice: "1 350 000 so'm",
    productId: "prod-13",
    categoryHint: "Poyabzal"
  }
];

export default function CommunityStreetstyle({ onSelectProduct, products = [] }) {
  const handleItemClick = (look, index) => {
    // 1. Primary lookup by productId
    let found = products.find(p => p.id === look.productId);

    // 2. Secondary fallback by category hint
    if (!found && look.categoryHint) {
      found = products.find(p => p.category === look.categoryHint);
    }

    // 3. Ultimate fallback
    if (!found && products.length > 0) {
      found = products[index % products.length];
    }

    if (found && onSelectProduct) {
      onSelectProduct(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-neutral-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Camera className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold">
                COMMUNITY SHOWCASE // STREETSTYLE LOOKBOOK
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black uppercase tracking-tight">
              Mijozlarimiz Tanlovi
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-500 max-w-md">
            Instagramda <strong>#storeUZ</strong> tegi ostida joylangan real mijozlarimiz obrazlari. O'zingizga yoqqan libosni 1 tugma bilan xarid qiling.
          </p>
        </div>

        {/* 4 Real Streetstyle Cards with Shoppable Overlay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMMUNITY_LOOKS.map((look, index) => (
            <div
              key={look.id}
              className="group relative h-[420px] rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-200 hover:border-black transition-all shadow-sm flex flex-col justify-between p-4"
            >
              {/* Photo */}
              <img
                src={look.image}
                alt={look.author}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

              {/* Top: City and author */}
              <div className="relative z-10 flex items-center justify-between text-white text-[11px] font-mono">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {look.city}
                </span>
                <span className="text-neutral-300 font-semibold">{look.author}</span>
              </div>

              {/* Bottom: Shoppable Tag Box */}
              <div className="relative z-10 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-lg text-black transition-transform group-hover:translate-y-0 translate-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                    Kiygan libosi:
                  </span>
                  <span className="text-xs font-mono font-black text-black">
                    {look.productPrice}
                  </span>
                </div>

                <div className="text-xs font-bold text-black truncate mb-2">
                  {look.productName}
                </div>

                <button
                  type="button"
                  onClick={() => handleItemClick(look, index)}
                  className="w-full py-2 px-3 rounded-lg bg-black hover:bg-neutral-800 active:scale-95 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Libosni ko'rish</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
