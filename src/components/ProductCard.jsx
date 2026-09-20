import React, { useState } from 'react';
import { Heart, Plane, Zap } from 'lucide-react';

export default function ProductCard({
  product,
  onSelectProduct,
  onBuyNow,
  onPreOrder,
  isWishlisted,
  onToggleWishlist
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');

  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(product.price);
  const formattedOldPrice = product.oldPrice 
    ? new Intl.NumberFormat('uz-UZ').format(product.oldPrice) 
    : null;

  return (
    <div 
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-black transition-all duration-300 shadow-sm hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Canvas with Smooth Hover Dual-Image Dissolve */}
      <div 
        className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out ${
            isHovered && product.hoverImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Lookbook Angle on Hover */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} lookbook`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-2 sm:top-3 inset-x-2 sm:inset-x-3 flex items-center justify-between z-10 pointer-events-none">
          {/* Clothing Category Tag */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider bg-black/80 text-white uppercase font-bold backdrop-blur-sm">
            {product.category}
          </span>

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 text-black hover:bg-black hover:text-white transition-all shadow-sm active:scale-90"
            title="Saralanganlarga saqlash"
          >
            <Heart 
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${
                isWishlisted ? 'fill-black text-black' : ''
              }`} 
            />
          </button>
        </div>

        {/* Floating Stock & Discount Badges */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex flex-wrap items-center gap-1 sm:gap-1.5 z-10 pointer-events-none">
          {product.stock === 1 ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-mono tracking-wider bg-red-600 text-white font-bold shadow-md">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-ping" />
              OXIRGI 1 DONA
            </span>
          ) : product.stock > 1 ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-mono tracking-wider bg-black/80 text-white font-medium backdrop-blur-sm">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400" />
              {product.stock} TA
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-mono tracking-wider bg-neutral-800 text-neutral-300">
              TUGAGAN
            </span>
          )}

          {product.discount > 0 && (
            <span className="px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full text-[8px] sm:text-[10px] font-mono font-bold bg-black text-white">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Card Body Information - Ultra-Compact on Mobile */}
      <div className="p-2 sm:p-4 md:p-5 flex flex-col justify-between flex-1 bg-white">
        
        {/* Brand & Name */}
        <div className="mb-1 sm:mb-2">
          <div className="flex items-center justify-between text-[8px] sm:text-[11px] font-mono text-neutral-500 mb-0.5">
            <span className="tracking-widest uppercase font-bold text-black truncate max-w-[65%]">
              {product.brand}
            </span>
            <span className="text-neutral-400 text-[8px] sm:text-[10px] truncate">
              {product.origin?.split(',')[0]}
            </span>
          </div>

          <h4 
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-sm md:text-base font-bold text-black line-clamp-1 hover:underline cursor-pointer leading-tight"
          >
            {product.name}
          </h4>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 mb-1.5 sm:mb-3">
          <span className="text-xs sm:text-base md:text-lg font-extrabold text-black font-mono tracking-tight">
            {formattedPrice} <span className="text-[9px] sm:text-xs font-normal text-neutral-500">so'm</span>
          </span>
          {formattedOldPrice && (
            <span className="text-[9px] sm:text-xs text-neutral-400 line-through font-mono hidden sm:inline">
              {formattedOldPrice} so'm
            </span>
          )}
        </div>

        {/* Inline Size Selector Pills - Desktop only to keep mobile cards ultra-compact */}
        <div className="hidden sm:block mb-4">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-1 uppercase">
            <span>O'lcham:</span>
            <span className="text-black font-bold">{selectedSize}</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-medium flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-black text-white font-bold shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: Single full-width button on mobile, dual grid on desktop */}
        <div className="pt-1.5 sm:pt-3 border-t border-neutral-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
            {product.stock > 0 ? (
              <button
                onClick={() => onBuyNow({ ...product, selectedSize })}
                className="w-full py-1.5 sm:py-2.5 px-2 rounded-lg sm:rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-[10px] sm:text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Zap className="w-3 h-3 fill-white text-white shrink-0" />
                <span>Sotib olish</span>
              </button>
            ) : (
              <button
                onClick={() => onPreOrder({ ...product, selectedSize })}
                className="w-full py-1.5 sm:py-2.5 px-2 rounded-lg sm:rounded-xl bg-white hover:bg-neutral-100 text-black border border-neutral-300 font-bold text-[10px] sm:text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                <Plane className="w-3 h-3 text-black shrink-0" />
                <span>Zakas berish</span>
              </button>
            )}

            <button
              onClick={() => onPreOrder({ ...product, selectedSize })}
              className="hidden sm:flex w-full py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-100 text-black border border-neutral-300 font-bold text-xs font-mono uppercase tracking-wider items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
              title="Xorijdan zakas berish"
            >
              <Plane className="w-3.5 h-3.5 text-black shrink-0" />
              <span>Zakas berish</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
