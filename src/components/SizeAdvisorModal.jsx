import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function SizeAdvisorModal({ isOpen, onClose }) {
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('72');
  const [fitPreference, setFitPreference] = useState('regular'); // 'slim' | 'regular' | 'oversize'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate recommended size
  const calculateSize = () => {
    const h = parseInt(height, 10) || 175;
    const w = parseInt(weight, 10) || 70;

    let baseSize = "M";

    if (h < 170 && w < 65) baseSize = "S";
    else if (h <= 178 && w <= 75) baseSize = "M";
    else if (h <= 186 && w <= 86) baseSize = "L";
    else baseSize = "XL";

    // Adjust for fit preference
    if (fitPreference === 'oversize') {
      if (baseSize === 'S') return { size: 'M', comment: 'Erkin va zamonaviy tushishi uchun bitta o\'lcham katta tavsiya etiladi' };
      if (baseSize === 'M') return { size: 'L', comment: 'Trenddagi oversize siluet uchun L o\'lcham ayni muddao' };
      if (baseSize === 'L') return { size: 'XL', comment: 'Erkin boxy-fit turishi uchun XL o\'lcham tavsiya etiladi' };
      return { size: 'XXL', comment: 'Maksimal erkinlik va qulaylik uchun' };
    }

    if (fitPreference === 'slim') {
      if (baseSize === 'XL') return { size: 'L', comment: 'Qomatga qotib turishi uchun bitta o\'lcham ixcham' };
      if (baseSize === 'L') return { size: 'M', comment: 'Badanga ixcham o\'tirishi uchun' };
      return { size: 'S', comment: 'Klassik tor siluet' };
    }

    return { size: baseSize, comment: 'Standart qulay bichimda o\'tiradi' };
  };

  const result = calculateSize();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-black">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
              ✦
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase font-mono text-black">
                Aqlli O'lcham Maslahatchisi
              </h3>
              <p className="text-[11px] font-mono text-neutral-500">
                Bo'yingiz va vazningiz asosida aniqlanadi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Height Slider / Input */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-neutral-600 font-bold uppercase">Bo'yingiz (sm):</span>
              <span className="text-base font-black text-black">{height} sm</span>
            </div>
            <input
              type="range"
              min="155"
              max="200"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
              <span>155 sm</span>
              <span>175 sm</span>
              <span>200 sm</span>
            </div>
          </div>

          {/* Weight Slider / Input */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-neutral-600 font-bold uppercase">Vazningiz (kg):</span>
              <span className="text-base font-black text-black">{weight} kg</span>
            </div>
            <input
              type="range"
              min="45"
              max="120"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
              <span>45 kg</span>
              <span>75 kg</span>
              <span>120 kg</span>
            </div>
          </div>

          {/* Fit preference */}
          <div>
            <label className="block text-xs font-mono font-bold text-neutral-600 uppercase mb-2">
              Kiyinish Uslubi:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'slim', label: 'Tor (Slim)' },
                { id: 'regular', label: 'Oddiy (Regular)' },
                { id: 'oversize', label: 'Keng (Oversize)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFitPreference(f.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    fitPreference === f.id
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Result Box */}
          <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-300 text-center space-y-2">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
              SIZGA TAVSIYA ETILADIGAN O'LCHAM:
            </span>
            <div className="text-4xl font-extrabold font-mono text-black">
              {result.size}
            </div>
            <p className="text-xs text-neutral-600 font-mono">
              {result.comment}
            </p>
          </div>

          <div className="text-[11px] text-neutral-500 text-center font-mono">
            Kuryer eshigingizga yetkazganda o'lcham to'g'ri kelmasa, darhol almashtirib beriladi.
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Tushundim, Tanlashda Davom Etish
          </button>

        </div>

      </div>
    </div>
  );
}
