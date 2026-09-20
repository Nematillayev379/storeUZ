import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "Kiyimlar haqiqatdan ham 100% originalmi?",
    a: "Ha, barcha liboslar Turkiya, Dubay, Yevropa va AQSHning rasmiy brend do'konlaridan (Zara, Massimo Dutti, Nike, Represent) bevosita xarid qilinadi. Har bir kiyim original qadoqda, kassa cheki va zavod shtrix-kodlari bilan yetkaziladi."
  },
  {
    q: "Yetkazib berish qancha vaqt oladi va narxi qancha?",
    a: "Toshkent shahri bo'ylab saytdagi mavjud kiyimlar 3 soat ichida shaxsiy tezkor kuryerimiz orqali eshikkacha BEPUL yetkaziladi. O'zbekistonning barcha viloyatlariga esa 24 soat ichida BTS yoki EMU pochta xizmati orqali yetkazib beriladi."
  },
  {
    q: "Agar o'lcham menga to'g'ri kelmasa nima bo'ladi?",
    a: "Kuryer kiyimni olib kelganda uni bemalol kiyib ko'rishingiz mumkin. Agar o'lcham to'g'ri kelmasa, kuryerimiz boshqa o'lchamini darhol bepul olib kelib beradi yoki to'lovni bekor qiladi."
  },
  {
    q: "Xorijdan zakas berish (Pre-Order) qanday ishlaydi?",
    a: "Agar saytda siz qidirgan o'lcham yoki model tugagan bo'lsa, 'Zakas berish' tugmasini bosasiz. Biz xorijdagi do'kondan uni siz uchun sotib olamiz va 5-7 kun ichida aviakargo orqali Toshkentga olib kelib topshiramiz. Oldindan to'lov talab etilmaydi."
  },
  {
    q: "To'lov qachon va qanday usulda qilinadi?",
    a: "Buyurtma uchun oldindan hech qanday to'lov qilinmaydi. To'lov faqatgina kiyimni qo'lingizga olib, tekshirib ko'rganingizdan so'ng Click, Payme yoki naqd pul shaklida amalga oshiriladi."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">
            SAVOLLARINGIZ BORMI?
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-black uppercase tracking-tight mb-2">
            Ko'p Beriladigan Savollar (FAQ)
          </h2>
          <p className="text-xs font-mono text-neutral-500">
            Xarid qilish, yetkazish va sifat kafolati bo'yicha eng muhim ma'lumotlar
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-white border-black shadow-sm' : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-black font-display">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? 'bg-black text-white rotate-180' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-neutral-600 leading-relaxed font-sans border-t border-neutral-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
