import React from 'react';
import { ShoppingBag, Plane, ShieldCheck, Truck } from 'lucide-react';

const STEPS = [
  {
    step: "01",
    icon: ShoppingBag,
    title: "Rasmiy Butiklardan Xarid",
    description: "Barcha liboslar Turkiya (Zorlu), Dubay (Dubai Mall), AQSH va Milanoning rasmiy butiklaridan do'kon cheklari bilan sotib olinadi."
  },
  {
    step: "02",
    icon: Plane,
    title: "To'g'ridan-to'g'ri Avia-Kargo",
    description: "Haftalik to'g'ridan-to'g'ri reyslar orqali Toshkent aeroportiga keltiriladi va rasmiy bojxona nazoratidan o'tkaziladi."
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "100% Original Sifat Nazorati",
    description: "Omborimizga tushgan har bir kiyim mato zichligi, zamoklari, choklari va o'lchamlari mutaxassislar tomonidan sinovdan o'tadi."
  },
  {
    step: "04",
    icon: Truck,
    title: "Eshikkacha Tezkor Yetkazish",
    description: "Toshkent shahrida 3 soat ichida shaxsiy kuryer orqali yetkaziladi. Kuryer oldida kiyib ko'rib, o'lcham to'g'ri kelmasa darhol almashtirish mumkin."
  }
];

export default function ProcessSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">
            ORIGINAL IMPORT MEXANIZMI
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-black uppercase tracking-tight mb-2">
            Buyurtmangiz Qanday Yetkaziladi?
          </h2>
          <p className="text-xs font-mono text-neutral-500">
            Xorijiy butikdan to sizning eshigingizgacha bo'lgan 4 bosqichli sifat kafolati
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-black transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-black text-black bg-white px-2.5 py-1 rounded-lg border border-neutral-200 shadow-sm">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-black shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-black uppercase font-display mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-400 uppercase">
                  ✓ Kafolatlangan
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
