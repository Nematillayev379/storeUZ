import React, { useEffect } from 'react';
import { X, Heart, Trash2, Zap } from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem,
  onBuyNow
}) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end animate-fade-in text-white">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#0A0A0C] border-l border-white/15 shadow-2xl flex flex-col z-10">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#111114] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 fill-white text-white" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Saralangan Liboslar ({wishlistItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400 space-y-3">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white uppercase font-mono">Hozircha hech narsa saqlanmagan</p>
              <p className="text-xs text-neutral-400 max-w-xs">
                O'zingizga yoqqan liboslardagi yurakchani bosib, ularni keyinroq xarid qilish uchun saqlab qo'yishingiz mumkin.
              </p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-22 rounded-lg object-cover shrink-0 border border-white/10"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-0.5">
                      <span className="text-white font-bold uppercase">{item.brand}</span>
                      <span>{item.category}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate mb-1">
                      {item.name}
                    </h4>
                    <div className="text-xs font-bold font-mono text-white">
                      {new Intl.NumberFormat('uz-UZ').format(item.price)} so'm
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onBuyNow(item);
                      }}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Zap className="w-3 h-3 fill-black" />
                      <span>Sotib olish</span>
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Bar */}
        {wishlistItems.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#111114]">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors"
            >
              Katalogda Davom Etish
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
