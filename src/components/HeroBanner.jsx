import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, Plane } from 'lucide-react';

const STORE_SLIDES = [
  {
    id: 1,
    tag: "YANGI MAVSUM // 2026 DROPI",
    title: "Yevropa & Turkiya Original Liboslari",
    subtitle: "Rasmiy brend do'konlaridan keltirilgan eksklyuziv kiyim-kechaklar. Toshkent omborida cheklangan nusxada.",
    buttonText: "Katalogga o'tish",
    targetCategory: "Barchasi",
    badge: "100% RASMIY IMPORT",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=90"
  },
  {
    id: 2,
    tag: "KUZGI / QISHKI ISSIQ KOLLEKSIYA",
    title: "Heavyweight Fleece & Kashmir Sviterlar",
    subtitle: "Zich to'qilgan fleece hudilar, Massimo Dutti kashmirlari va vintage bomber kurtkalar.",
    buttonText: "Hudilarni ko'rish",
    targetCategory: "Hudi & Sviter",
    badge: "PREMIUM SIFAT",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=90"
  },
  {
    id: 3,
    tag: "STREETWEAR & DENIM DROPI",
    title: "Baggy Fit Djinsilar va Retro Krossovkalar",
    subtitle: "Bershka keng bichimli baggy shimlari va New Balance 550 original modellari.",
    buttonText: "Shimlarni ko'rish",
    targetCategory: "Shim & Djinsi",
    badge: "TREND 2026",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop&q=90"
  }
];

export default function HeroBanner({ onSelectCategory, onExploreClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % STORE_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % STORE_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + STORE_SLIDES.length) % STORE_SLIDES.length);
  };

  const slide = STORE_SLIDES[currentSlide];

  return (
    <section className="w-full relative bg-neutral-900 overflow-hidden">
      
      {/* 1. Real Store Banner Carousel (Compact on mobile, grand on desktop) */}
      <div className="relative w-full h-[340px] sm:h-[460px] lg:h-[680px] min-h-[320px] sm:min-h-[440px] lg:min-h-[640px] overflow-hidden">
        
        {/* Slides Images with Transition */}
        {STORE_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover object-center filter brightness-90"
            />
            {/* Dual Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/80 pointer-events-none" />
          </div>
        ))}

        {/* Content Container (Padded top to sit below navbar) */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-center pt-28 sm:pt-36 lg:pt-40 pb-6 sm:pb-14">
          <div className="max-w-xl text-white">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-[9px] sm:text-[11px] uppercase tracking-wider mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{slide.tag}</span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-display font-extrabold tracking-tight text-white mb-2 sm:mb-3 leading-tight">
              {slide.title}
            </h1>

            {/* Subtitle - Desktop/Tablet only to save vertical space on mobile */}
            <p className="hidden sm:block text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6 max-w-lg">
              {slide.subtitle}
            </p>

            {/* Action Button */}
            <div>
              <button
                onClick={() => {
                  onSelectCategory(slide.targetCategory);
                  onExploreClick();
                }}
                className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-black font-bold text-xs sm:text-sm font-mono tracking-wider uppercase flex items-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer"
              >
                <span>{slide.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
              </button>
            </div>

          </div>
        </div>

        {/* Prev / Next Carousel Arrow Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
          title="Oldingi slayd"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
          title="Keyingi slayd"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
        </button>

        {/* Real Pagination Dots Indicators */}
        <div className="absolute bottom-3 sm:bottom-5 inset-x-0 z-20 flex items-center justify-center gap-1.5 sm:gap-2">
          {STORE_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="py-1 cursor-pointer"
              aria-label={`Slayd ${idx + 1}`}
            >
              <div className={`h-1 sm:h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-5 sm:w-8 bg-white' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
              }`} />
            </button>
          ))}
        </div>

      </div>

      {/* 2. Trust Bar (Store Guarantees - Desktop & Tablet only to let mobile customers reach products instantly) */}
      <div className="hidden sm:block w-full bg-white border-b border-neutral-200 py-3.5 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-700">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-black shrink-0" />
            <span className="font-semibold text-black">Toshkentda 3 soatda kuryer</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-black shrink-0" />
            <span>100% Rasmiy Butik Kafolati</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-black shrink-0" />
            <span>Turkiya, Dubay va AQSH importi</span>
          </div>
        </div>
      </div>

    </section>
  );
}
