import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Zap, 
  Phone, 
  User, 
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendTelegramOrder, generateDirectTelegramUrl } from '../services/telegramService';

export default function BuyModal({ product, onClose, onOrderSuccess }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [selectedSize, setSelectedSize] = useState(product?.selectedSize || product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.selectedColor || product?.colors?.[0] || 'Standart');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');

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

  const totalPrice = (product?.price || 0) * quantity;
  const formattedTotal = new Intl.NumberFormat('uz-UZ').format(totalPrice);

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
      quantity,
      address: address.trim() || "Toshkent shahri (kuryer aniqlashtiradi)",
      totalPrice,
      isPreOrder: false
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
      
      if (onOrderSuccess) {
        onOrderSuccess(product.id, quantity);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Buyurtmani yuborishda xatolik yuz berdi. Iltimos, Telegram orqali to'g'ridan-to'g'ri yozing.");
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

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0A0A0C] border border-white/15 shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#111114]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
              <Zap className="w-4 h-4 fill-black" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                Tezkor Xarid • Toshkent Ombori
              </h3>
              <p className="text-[11px] font-mono text-neutral-400">
                1 kun ichida yetkazib beriladi
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

        {/* Modal Content */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            
            {/* Product Mini Preview */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-20 rounded-lg object-cover shrink-0 border border-white/10"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-0.5">
                  {product.brand} • {product.refCode}
                </span>
                <h4 className="text-xs font-bold text-white truncate mb-1">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-white font-mono">
                    {new Intl.NumberFormat('uz-UZ').format(product.price)} so'm
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    • Omborda: {product.stock} ta
                  </span>
                </div>
              </div>
            </div>

            {/* Size & Color Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                  O'lcham:
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white font-mono"
                >
                  {product.sizes?.map((s) => (
                    <option key={s} value={s} className="bg-black text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                  Rang:
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white font-mono"
                >
                  {product.colors?.map((c) => (
                    <option key={c} value={c} className="bg-black text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                  Ismingiz:
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Sardor Aliyev"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                  Telefon raqamingiz:
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 w-4 h-4 text-neutral-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+998 90 123 45 67"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white font-mono placeholder-neutral-500 outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                  Telegram Username (adminga yuboriladi):
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-mono text-white">@</span>
                  <input
                    type="text"
                    value={telegramUsername}
                    onChange={handleTelegramChange}
                    placeholder="username"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl pl-8 pr-3 py-2.5 text-xs text-white font-mono placeholder-neutral-500 outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                  Yetkazish manzili:
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Shahar, tuman, ko'cha, uy raqami"
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Total Price & Submit Button */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">Jami to'lov:</span>
                <span className="text-lg font-bold font-mono text-white">
                  {formattedTotal} so'm
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
                    <span>Yuborilmoqda...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Tasdiqlash</span>
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1 uppercase font-mono">
                Buyurtmangiz Qabul Qilindi!
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                Barcha ma'lumotlar va fotosurat Telegram Bot orqali adminga yuborildi. Menejerimiz tez orada siz bilan bog'lanadi.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>Libos:</span>
                <span className="text-white font-medium truncate max-w-[200px]">{orderSummary?.productName}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>O'lcham / Rang:</span>
                <span className="text-white font-bold">{orderSummary?.selectedSize} / {orderSummary?.selectedColor}</span>
              </div>
              <div className="flex justify-between text-neutral-400 border-t border-white/10 pt-2 font-bold">
                <span>Jami:</span>
                <span className="text-white">{new Intl.NumberFormat('uz-UZ').format(orderSummary?.totalPrice)} so'm</span>
              </div>
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
