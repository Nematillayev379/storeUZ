import React from 'react';

export default function TopBarMarquee() {
  const announcements = [
    "✦ TOSHKENT SHAHRI BO'YLAB 3 SOATDA TEZKOR YETKAZIB BERISH",
    "100% RASMIY IMPORT: TURKIYA, DUBAY, AQSH VA ITALIYA BUTIKLARI",
    "TO'LOVNI KIYIB KO'RGANDAN SO'NG AMALGA OSHIRING (CLICK / PAYME / NAQD)",
    "O'LCHAM MOS KELMASA 24 SOAT ICHIDA BEPUL ALMASHTIRISH",
    "TELEGRAM SHAXSIY STILIST ORQALI 24/7 BEPUL MASLAHAT",
    "NOVIY SEZON 2026 EKSKLYUZIV CHEKLANGAN DROPLARI"
  ];

  return (
    <div className="hidden md:block w-full bg-black/60 backdrop-blur-md text-white text-[10.5px] font-mono tracking-widest uppercase py-1.5 overflow-hidden border-b border-white/10 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-8 shrink-0 pr-8">
            {announcements.map((text, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-neutral-400 font-bold">✦</span>
                <span className="text-neutral-200 hover:text-white transition-colors">{text}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
