import React from 'react';
import { ShieldCheck, Plane, Truck, Clock, ArrowUp } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TelegramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.42-1.43-.88.03-.24.38-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.49 3.85-1.61 4.65-1.89 5.17-1.9.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.15-.04.2z"/>
  </svg>
);

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-10 sm:mt-20 border-t border-white/10 bg-black text-neutral-400">
      
      {/* Guarantees Bar (Desktop/Tablet Only - Hidden on mobile) */}
      <div className="hidden md:block w-full px-4 sm:px-8 lg:px-12 py-10 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono">100% Original Sifat</h4>
              <p className="text-[11px] text-neutral-400 font-mono">Rasmiy butiklardan</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono">Tezkor Yetkazish</h4>
              <p className="text-[11px] text-neutral-400 font-mono">Toshkentda 3 soatda</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono">To'g'ridan-to'g'ri Reys</h4>
              <p className="text-[11px] text-neutral-400 font-mono">Xalqaro aviakargo</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono">24/7 Telegram Aloqa</h4>
              <p className="text-[11px] text-neutral-400 font-mono">Menejerlar onlayn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          <div className="md:col-span-6 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-white text-black flex items-center justify-center font-bold text-xs">
                ✦
              </div>
              <span className="font-display text-base sm:text-lg font-black tracking-tight text-white uppercase">
                store<span className="text-neutral-400">UZ</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-md">
              Xorijiy rasmiy butiklardan to'g'ridan-to'g'ri keltirilgan premium original liboslar vitrinasi. Toshkent omboridan darhol xarid qiling yoki xorijdan zakas bering.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://t.me/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 sm:p-2.5 rounded-lg bg-white/5 hover:bg-white hover:text-black text-white border border-white/10 transition-all"
                title="Telegram Kanal"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 sm:p-2.5 rounded-lg bg-white/5 hover:bg-white hover:text-black text-white border border-white/10 transition-all"
                title="Instagram Sahifa"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenAdmin}
                className="md:hidden ml-auto text-[11px] font-mono text-neutral-300 hover:text-white border border-white/20 px-3 py-1.5 rounded-full"
              >
                ⚙️ Admin
              </button>
            </div>
          </div>

          <div className="hidden md:block md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Kiyim Turlari
            </h5>
            <ul className="text-xs space-y-2 font-mono text-neutral-400">
              <li>Futbolkalar & Pololar</li>
              <li>Shim & Djinsilar (Baggy/Slim)</li>
              <li>Hudi & Sviterlar</li>
              <li>Kurtka & Paltolar</li>
              <li>Poyabzal & Krossovkalar</li>
            </ul>
          </div>

          <div className="hidden md:block md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Boshqaruv
            </h5>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Do'kon egasi uchun ombor nazorati va Telegram Bot sozlamalari.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-xs font-mono text-white underline hover:text-neutral-300"
              >
                ⚙️ Admin Paneliga Kirish
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2026 storeUZ. Barcha huquqlar himoyalangan.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-white hover:text-neutral-400 transition-colors"
          >
            <span>Tepaga qaytish</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
}
