import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plane, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendTelegramOrder, generateDirectTelegramUrl } from '../services/telegramService';

export default function PreOrderModal({ product, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [selectedSize, setSelectedSize] = useState(product?.selectedSize || product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.selectedColor || product?.colors?.[0] || 'Standart');
  const [comment, setComment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setPhone(val);
  };

  const handleTelegramChange = (e) => {
    let val = e.target.value.replace('@', '');
    setTelegramUsername(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage("Iltimos, ismingizni kiriting");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 12) {
      setErrorMessage("Telefon raqamingizni to'liq kiriting: +998 (XX) XXX-XX-XX");
      return;
    }

    if (!telegramUsername.trim()) {
      setErrorMessage("Telegram usernameingizni kiriting (masalan: @username)");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      productName: product.name,
      productBrand: product.brand,
      refCode: product.refCode,
      origin: product.origin,
      productImage: product.image,
      clientName: name.trim(),
      clientPhone: phone.trim(),
      telegramUsername: `@${telegramUsername.trim().replace(/^@/, '')}`,
      selectedSize,
      selectedColor,
      quantity: 1,
      address: comment.trim() || "Xorijdan maxsus aviakargo buyurtmasi",
      totalPrice: product.price,
      isPreOrder: true,
      preOrderDays: product.preOrderDays || "5-7 kun"
    };

    try {
      await sendTelegramOrder(orderData);
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setOrderSummary(orderData);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Buyurtmani yuborishda xatolik yuz berdi. Iltimos, Telegram orqali bog'laning.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-white">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Flight Cargo Boarding Pass Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0A0A0C] border border-white/15 shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#111114] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
              <Plane className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                Xalqaro Avia-Kargo Zakas Berish
              </h3>
              <p className="text-[11px] font-mono text-neutral-400">
                {product.origin} ➔ Toshkent • {product.preOrderDays || "5-7 kun"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            
            {/* Flight Manifest Card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-400 border-b border-white/10 pb-2">
                <span>REYS: {product.refCode}</span>
                <span className="text-white font-bold">BOJXONA KAFOLATI</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase">Chiqish:</span>
                  <span className="text-sm font-bold text-white">{product.origin}</span>
                </div>
                <div className="flex flex-col items-center px-4">
                  <span className="text-[10px] text-neutral-400">AIR CARGO</span>
                  <div className="w-20 h-[1px] bg-white/40 my-1" />
                  <span className="text-[10px] text-white">{product.preOrderDays || "5-7 kun"}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block uppercase">Yetib kelish:</span>
                  <span className="text-sm font-bold text-white">Toshkent 🇺🇿</span>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center gap-2 pt-2 border-t border-white/10">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <span>Rasmiy butikdan chek va original qadoqda keltiriladi.</span>
              </div>
            </div>

            {/* Size & Color Picker */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">O'lcham:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white font-mono"
                >
                  {product.sizes?.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">Rang:</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white font-mono"
                >
                  {product.colors?.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Client Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">Ismingiz:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingiz va familiyangiz"
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">Telefon raqamingiz:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+998 90 123 45 67"
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-neutral-500 outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">Telegram Username:</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-mono text-white">@</span>
                  <input
                    type="text"
                    value={telegramUsername}
                    onChange={handleTelegramChange}
                    placeholder="username"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl pl-8 pr-3 py-2.5 text-xs text-white font-mono placeholder-neutral-500 outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">Qo'shimcha izoh (ixtiyoriy):</label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Maxsus talablar yoki kuryer yetkazish manzili"
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">Narx kafolati:</span>
                <span className="text-base font-bold font-mono text-white">
                  {new Intl.NumberFormat('uz-UZ').format(product.price)} so'm
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Bron qilinmoqda...</span>
                  </>
                ) : (
                  <>
                    <Plane className="w-3.5 h-3.5 text-black" />
                    <span>Bron Qilish</span>
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          <div className="p-6 sm:p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-inner">
              <Plane className="w-8 h-8 text-white" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1 font-mono uppercase">
                Avia Zakas Qabul Qilindi!
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                {product.origin} butigidan Toshkentga to'g'ridan-to'g'ri reys orqali keltiriladi. Menejerimiz tez orada siz bilan bog'lanadi.
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href={generateDirectTelegramUrl(orderSummary)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Telegramda Menejerga Yozish</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
