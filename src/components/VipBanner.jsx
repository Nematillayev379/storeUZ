import React from 'react';
import { Send, Sparkles, ArrowRight } from 'lucide-react';

const TelegramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.42-1.43-.88.03-.24.38-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.49 3.85-1.61 4.65-1.89 5.17-1.9.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.15-.04.2z"/>
  </svg>
);

export default function VipBanner() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-10 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
            <TelegramIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-white text-black px-2 py-0.5 rounded font-bold">
                VIP KLUB
              </span>
              <span className="text-xs font-mono text-neutral-400">
                12,500+ a'zolar
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-white mt-1">
              Yangi Reyslar va Maxsus Chegirmalardan Birinchi Bo'lib Xabardor Bo'ling
            </h3>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
          >
            <span>Telegram Kanalga Qo'shilish</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </a>
        </div>

      </div>
    </section>
  );
}
