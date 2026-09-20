import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Jahongir R.",
    city: "Toshkent shahri",
    product: "Zara Studio Vintage Bomber",
    rating: 5,
    date: "Kecha, 18:30",
    text: "Bomber haqiqatdan ham og'ir va juda sifatli ekan. Kuryer buyurtma berganimdan 2 soat o'tib eshigimga olib keldi, kiyib ko'rdim, o'lchami ideal. Rahmat!",
    photo: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Sardor M.",
    city: "Samarqand",
    product: "Nike Lab Fleece Hudi",
    rating: 5,
    date: "2 kun oldin",
    text: "Nike fleece matosi juda qalin, 100% original AQSH versiyasi. Boshqa do'konlarda topolmagandim. 24 soat ichida BTS orqali yetib keldi.",
    photo: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Madina A.",
    city: "Toshkent shahri",
    product: "Massimo Dutti Cashmere Sviter",
    rating: 5,
    date: "3 kun oldin",
    text: "Kashmir to'qimasi shunchalik yumshoqki, kiyganda juda nafis turadi. Telegram orqali menejer o'lcham tanlashda yordam berdi. Juda mamnunman.",
    photo: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Bobur T.",
    city: "Buxoro",
    product: "Bershka Baggy Denim Shim",
    rating: 5,
    date: "Hafta boshida",
    text: "Baggy bichimi aynan Instagramdagi videolardagidek erkin tushdi. Qattiq zich denim, sifati a'lo.",
    photo: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&auto=format&fit=crop&q=80"
  }
];

export default function ReviewsSection() {
  return (
    <section className="hidden md:block w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">
              HAQIQIY MIJOZLAR TAASSUROTIDAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-black uppercase tracking-tight">
              Mijozlar Fikrlari & Kafolat
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-600">
            <span className="flex text-black">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-black text-black" />
              ))}
            </span>
            <span className="font-bold text-black">4.98 / 5.0</span>
            <span>(1,200+ mamnun mijozlar)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-black transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-black">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">{rev.date}</span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed mb-4">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center gap-3">
                <img
                  src={rev.photo}
                  alt={rev.product}
                  className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-black truncate">{rev.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 block truncate">
                    {rev.city} • {rev.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
