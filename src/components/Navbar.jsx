import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  SlidersHorizontal, 
  X,
  Menu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CLOTHING_CATEGORIES } from '../data/initialProducts';

const TelegramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.42-1.43-.88.03-.24.38-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.49 3.85-1.61 4.65-1.89 5.17-1.9.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.15-.04.2z"/>
  </svg>
);

export default function Navbar({
  searchTerm,
  setSearchTerm,
  wishlistCount,
  onOpenWishlist,
  onOpenAdmin,
  selectedCategory,
  onSelectCategory,
  isCatalogOpen,
  setIsCatalogOpen,
  onGoHome,
  products
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-2xl border-white/20 shadow-2xl' 
        : 'bg-black/60 backdrop-blur-xl border-white/15'
    }`}>
      
      {/* Main Bar Container */}
      <div className="w-full px-3 sm:px-6 lg:px-10 py-2.5 sm:py-3">
        
        {/* Top Row: Logo + Katalog (Desktop) + Search (Desktop) + Actions */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-5">
          
          {/* 1. Brand Logo */}
          <div className="flex items-center shrink-0">
            <button 
              onClick={onGoHome}
              className="text-left group flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs sm:text-sm shadow-md group-hover:scale-105 transition-transform">
                ✦
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white uppercase leading-none">
                  store<span className="text-neutral-400">UZ</span>
                </span>
                <span className="text-[7.5px] sm:text-[9px] font-mono tracking-widest text-neutral-400 uppercase mt-0.5">
                  Online Store
                </span>
              </div>
            </button>
          </div>

          {/* 2. KATALOG Button on Desktop (Positioned immediately after Logo, swapped with input!) */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              onClick={() => setIsCatalogOpen(prev => !prev)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer ${
                isCatalogOpen
                  ? 'bg-white text-black ring-2 ring-white scale-105'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              <Menu className="w-4 h-4 text-black" />
              <span>KATALOG</span>
              {isCatalogOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-neutral-700" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-neutral-700" />
              )}
            </button>
          </div>

          {/* 3. Search Input - Desktop (Takes wide center space between Katalog and User Actions) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-4">
            <div className="relative flex items-center w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-4 py-2 focus-within:border-white focus-within:bg-black/75 focus-within:ring-1 focus-within:ring-white transition-all backdrop-blur-md">
              <Search className="w-4 h-4 text-neutral-300 mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Mahsulotlarni qidirish (hudi, shim, kurtka, brend)..."
                className="bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-neutral-400 w-full font-sans"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-neutral-400 hover:text-white ml-2 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 4. Action Controls: Wishlist + Telegram + Admin (Desktop & Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Mobile Katalog Button (< 768px) */}
            <div className="block md:hidden">
              <button
                onClick={() => setIsCatalogOpen(prev => !prev)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-mono text-[10.5px] font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer ${
                  isCatalogOpen
                    ? 'bg-white text-black ring-1 ring-white'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                <Menu className="w-3 h-3 text-black" />
                <span>KATALOG</span>
                {isCatalogOpen ? (
                  <ChevronUp className="w-3 h-3 text-neutral-700" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-neutral-700" />
                )}
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer group"
              title="Saralanganlar"
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110 ${wishlistCount > 0 ? 'fill-white text-white' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black font-mono text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Telegram Link (Desktop & Tablet) */}
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono transition-all"
              title="Telegram Do'kon"
            >
              <TelegramIcon className="w-3.5 h-3.5 text-white" />
              <span>Telegram</span>
            </a>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase transition-all cursor-pointer"
              title="Admin boshqaruv paneli"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
              <span className="hidden xl:inline">ADMIN</span>
            </button>

          </div>

        </div>

        {/* 5. Mobile Search Row (< 768px: Always clean, accessible, full-width) */}
        <div className="mt-2 w-full block md:hidden">
          <div className="relative flex items-center w-full bg-white/10 border border-white/25 rounded-full px-3 py-1.5 focus-within:border-white focus-within:bg-black/80 transition-all backdrop-blur-md">
            <Search className="w-3.5 h-3.5 text-neutral-300 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Mahsulotlarni qidirish (hudi, shim, kurtka)..."
              className="bg-transparent border-none outline-none text-xs text-white placeholder-neutral-400 w-full font-sans"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-neutral-400 hover:text-white ml-1.5 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 6. Sub-Navbar Drawer: "Katalog" bosilganda ochiladigan toifalar paneli */}
      {isCatalogOpen && (
        <div className="w-full bg-black/95 backdrop-blur-2xl border-t border-white/15 border-b border-white/20 px-3 sm:px-8 lg:px-12 py-2.5 sm:py-3 animate-fade-in shadow-2xl">
          <div className="w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-widest mr-1 sm:mr-2 shrink-0 font-bold hidden sm:inline">
                TOIFALAR:
              </span>
              {CLOTHING_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = products 
                  ? (cat === 'Barchasi' ? products.filter(p => p.stock > 0).length : products.filter(p => p.category === cat && p.stock > 0).length)
                  : null;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                      setIsCatalogOpen(false);
                      const el = document.getElementById('catalogue');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-white text-black font-bold shadow-md scale-105'
                        : 'bg-white/10 text-neutral-200 hover:text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    <span>{cat}</span>
                    {count !== null && (
                      <span className={`text-[9px] sm:text-[10px] ml-1 px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-black text-white' : 'bg-white/20 text-neutral-300'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsCatalogOpen(false)}
              className="text-neutral-400 hover:text-white p-1 text-xs font-mono flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Yopish</span>
            </button>

          </div>
        </div>
      )}

    </nav>
  );
}
