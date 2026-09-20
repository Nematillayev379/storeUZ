import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Plane, 
  Zap, 
  RotateCcw,
  Check
} from 'lucide-react';

export default function ProductDetail({
  product,
  onBack,
  onBuyNow,
  onPreOrder,
  isWishlisted,
  onToggleWishlist
}) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Standart');

  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(product.price);
  const formattedOldPrice = product.oldPrice 
    ? new Intl.NumberFormat('uz-UZ').format(product.oldPrice) 
    : null;

  const gallery = product.images && product.images.length > 0 
    ? product.images 
    : [product.image, product.hoverImage].filter(Boolean);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fade-in text-black bg-white">
      
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-neutral-200">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BOSH SAHIFAGA QAYTISH</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
            {product.refCode}
          </span>
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-black transition-all cursor-pointer"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-black text-black' : ''}`} />
            <span>{isWishlisted ? 'Saqlangan' : 'Saqlash'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Showcase Grid - Compact & Proportionate */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Gallery (Compact max-height, not oversized!) */}
        <div className="md:col-span-6 flex flex-col items-center gap-3">
          
          {/* Main Photo (max-h-[460px] to keep it comfortably sized) */}
          <div className="relative w-full max-w-md aspect-[3/4] max-h-[460px] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-black/85 text-white uppercase font-bold shadow-sm">
                <span>{product.category}</span>
                <span className="text-neutral-400">•</span>
                <span>{product.origin}</span>
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {gallery.length > 1 && (
            <div className="flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar py-1">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-14 h-18 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-black scale-105 shadow-sm'
                      : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Ko'rinish ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Order Details & Actions */}
        <div className="md:col-span-6 flex flex-col justify-start space-y-5">
          
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1.5">
              <span className="tracking-widest uppercase font-extrabold text-black">
                {product.brand}
              </span>
              <span className="text-emerald-700 font-bold flex items-center gap-1 font-mono text-[11px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Original Kafolati
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-display font-bold text-black tracking-tight leading-snug mb-2">
              {product.name}
            </h1>

            {/* Price & Discount */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-black tracking-tight">
                {formattedPrice} <span className="text-sm font-normal text-neutral-500">so'm</span>
              </span>
              {formattedOldPrice && (
                <span className="text-base text-neutral-400 line-through font-mono">
                  {formattedOldPrice} so'm
                </span>
              )}
              {product.discount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-black text-white">
                  -{product.discount}% CHEGIRMA
                </span>
              )}
            </div>
          </div>

          {/* Live Inventory Status */}
          <div className="p-3 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${product.stock === 1 ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-neutral-900 font-mono font-bold">
                {product.stock > 1 
                  ? `Toshkent omborida mavjud: ${product.stock} dona` 
                  : product.stock === 1 
                  ? `Oxirgi 1 dona qoldi!` 
                  : `Omborda tugagan (Zakas qiling)`}
              </span>
            </div>
            <span className="font-mono text-neutral-500 text-[11px]">
              {product.origin}
            </span>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1.5 uppercase">
                <span>Rang:</span>
                <span className="text-black font-bold">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      selectedColor === c
                        ? 'bg-black text-white font-bold shadow-sm'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1.5 uppercase">
                <span>O'lcham:</span>
                <span className="text-black font-bold">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {product.stock > 0 && (
              <button
                onClick={() => onBuyNow({ ...product, selectedSize, selectedColor })}
                className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white text-white" />
                <span>Toshkentdan Sotib Olish (1 kun)</span>
              </button>
            )}

            <button
              onClick={() => onPreOrder({ ...product, selectedSize, selectedColor })}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-black font-bold text-xs font-mono tracking-widest uppercase border border-neutral-300 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plane className="w-4 h-4 text-black" />
              <span>Xorijdan Zakas Berish ({product.transitTime})</span>
            </button>
          </div>

          {/* Delivery & Material Details */}
          <div className="space-y-2 pt-3 border-t border-neutral-200 text-xs text-neutral-600 font-mono">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-black shrink-0" />
              <span>Toshkent shahrida 3 soat ichida eshikkacha kuryer</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-black shrink-0" />
              <span>O'lcham to'g'ri kelmasa darhol almashtirib beriladi</span>
            </div>
          </div>

          {/* Description */}
          <div className="pt-2 text-xs text-neutral-600 leading-relaxed">
            <p className="mb-2">{product.description}</p>
            {product.material && (
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-[11px] font-mono text-neutral-700">
                <span className="font-bold text-black">Mato tarkibi: </span>
                {product.material}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
