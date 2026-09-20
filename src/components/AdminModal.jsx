import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Package, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  RefreshCw, 
  Sliders
} from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';
import { getTelegramConfig, saveTelegramConfig, testTelegramConnection } from '../services/telegramService';
import { CLOTHING_CATEGORIES } from '../data/initialProducts';

export default function AdminModal({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
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

  const [activeTab, setActiveTab] = useState('inventory');
  const fileInputRef = useRef(null);

  // New product form states
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('ZARA STUDIO');
  const [origin, setOrigin] = useState('Istanbul 🇹🇷');
  const [category, setCategory] = useState('Futbolkalar');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [stock, setStock] = useState('3');
  const [sizes, setSizes] = useState('S, M, L, XL');
  const [colors, setColors] = useState('Qora, Oq, Grafit');
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [hoverImageUrl, setHoverImageUrl] = useState('');
  const [preOrderDays, setPreOrderDays] = useState('5-7 kun');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [imageProcessing, setImageProcessing] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  // Telegram settings states
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [testStatus, setTestStatus] = useState({ loading: false, success: false, error: '' });

  useEffect(() => {
    const config = getTelegramConfig();
    setBotToken(config.botToken || '');
    setChatId(config.chatId || '');
    setAdminUsername(config.adminUsername || '');
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle local image upload with compression
  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageProcessing(true);
    try {
      const compressed = await compressImage(file, 900, 1200, 0.82);
      setImagePreview(compressed);
      setImageUrl(compressed);
    } catch (err) {
      console.error(err);
      alert("Rasmni siqishda xatolik yuz berdi");
    } finally {
      setImageProcessing(false);
    }
  };

  const handleSaveTelegram = (e) => {
    e.preventDefault();
    saveTelegramConfig({
      botToken: botToken.trim(),
      chatId: chatId.trim(),
      adminUsername: adminUsername.trim().replace(/^@/, '')
    });
    alert("Telegram sozlamalari muvaffaqiyatli saqlandi!");
  };

  const handleTestConnection = async () => {
    setTestStatus({ loading: true, success: false, error: '' });
    const result = await testTelegramConnection();
    setTestStatus({
      loading: false,
      success: result.success,
      error: result.error || ''
    });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || (!imagePreview && !imageUrl.trim())) {
      alert("Iltimos, mahsulot nomi, narxi va rasmini kiriting!");
      return;
    }

    const numPrice = parseInt(price.replace(/\D/g, ''), 10) || 0;
    const numOldPrice = oldPrice ? parseInt(oldPrice.replace(/\D/g, ''), 10) : null;
    const numStock = parseInt(stock, 10) || 0;

    let discount = 0;
    if (numOldPrice && numOldPrice > numPrice) {
      discount = Math.round(((numOldPrice - numPrice) / numOldPrice) * 100);
    }

    const sizesArr = sizes.split(',').map(s => s.trim()).filter(Boolean);
    const colorsArr = colors.split(',').map(c => c.trim()).filter(Boolean);

    const newProd = {
      id: `prod-${Date.now()}`,
      refCode: `REF. #${origin.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      brand: brand.trim().toUpperCase(),
      origin,
      originCode: origin.includes('Istanbul') ? 'turkey' : origin.includes('Dubay') ? 'dubai' : origin.includes('Milano') ? 'italy' : 'usa',
      transitTime: preOrderDays,
      category,
      price: numPrice,
      oldPrice: numOldPrice,
      discount,
      stock: numStock,
      sizes: sizesArr.length ? sizesArr : ['M', 'L', 'XL'],
      colors: colorsArr.length ? colorsArr : ['Qora', 'Oq'],
      image: imagePreview || imageUrl.trim(),
      hoverImage: hoverImageUrl.trim() || imagePreview || imageUrl.trim(),
      images: [imagePreview || imageUrl.trim(), hoverImageUrl.trim()].filter(Boolean),
      isAvailable: numStock > 0,
      preOrderDays,
      adminComment: '',
      description: description.trim() || "Xorijiy rasmiy butikdan keltirilgan original libos.",
      material: material.trim() || "100% Original paxta/jun",
      status: numStock > 0 ? 'in_stock' : 'out_of_stock'
    };

    onAddProduct(newProd);
    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
      setName('');
      setPrice('');
      setOldPrice('');
      setImagePreview('');
      setImageUrl('');
      setHoverImageUrl('');
      setDescription('');
      setMaterial('');
      setActiveTab('inventory');
    }, 1200);
  };

  const depletedProducts = products.filter(p => p.stock === 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in text-white">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Control Center Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-[#0A0A0C] border border-white/15 shadow-2xl overflow-hidden z-10 flex flex-col my-auto">
        
        {/* Header Bar */}
        <div className="p-5 border-b border-white/10 bg-[#111114] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4 text-black" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide uppercase font-mono">
                storeUZ Boshqaruv Markazi
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                Ombor nazorati, kiyim turlari va Telegram Bot sozlamalari
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

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 p-3 bg-[#0E0E10] border-b border-white/10 overflow-x-auto no-scrollbar">
          {[
            { id: 'inventory', label: 'Ombordagi Mahsulotlar', icon: Package, badge: products.length },
            { id: 'add', label: 'Yangi Libos Qo\'shish', icon: Plus },
            { id: 'depleted', label: 'Tugaganlar (0 ta)', icon: AlertTriangle, badge: depletedProducts.length, alert: depletedProducts.length > 0 },
            { id: 'telegram', label: 'Telegram Bot Sozlamalari', icon: Send }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-black text-white' 
                      : tab.alert 
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                      : 'bg-white/10 text-neutral-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 max-h-[calc(90vh-160px)]">
          
          {/* TAB 1: INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Jami ro'yxatdagi liboslar ({products.length} ta)
                </span>
                <button
                  onClick={() => setActiveTab('add')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-mono font-bold uppercase transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Yangi qo'shish</span>
                </button>
              </div>

              <div className="space-y-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-18 rounded-lg object-cover shrink-0 border border-white/10"
                      />
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                          <span className="text-white font-bold uppercase">{p.brand}</span>
                          <span>•</span>
                          <span>{p.category}</span>
                          <span>•</span>
                          <span>{p.origin}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                          {p.name}
                        </h4>
                        <div className="text-xs font-mono font-bold text-neutral-300 mt-1">
                          {new Intl.NumberFormat('uz-UZ').format(p.price)} so'm
                        </div>
                      </div>
                    </div>

                    {/* Stock Stepper & Delete */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                      <div className="flex items-center gap-1.5 bg-black p-1 rounded-lg border border-white/15">
                        <button
                          onClick={() => {
                            const newStock = Math.max(0, (p.stock || 0) - 1);
                            onUpdateProduct(p.id, { stock: newStock });
                          }}
                          className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-sm"
                          title="1 dona kamaytirish"
                        >
                          -
                        </button>
                        <span className={`px-2.5 font-mono text-xs font-bold ${
                          p.stock === 0 ? 'text-red-400' : 'text-white'
                        }`}>
                          {p.stock} ta
                        </span>
                        <button
                          onClick={() => {
                            const newStock = (p.stock || 0) + 1;
                            onUpdateProduct(p.id, { stock: newStock });
                          }}
                          className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-sm"
                          title="1 dona qo'shish"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`"${p.name}" libosini o'chirishni tasdiqlaysizmi?`)) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="p-2.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW GARMENT */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProduct} className="space-y-4">
              {addSuccess && (
                <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-white text-xs flex items-center gap-2 animate-fade-in font-mono">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span>Yangi mahsulot katalogga muvaffaqiyatli qo'shildi!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                    Kiyim Nomi:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Oversize Boxy Heavyweight T-Shirt"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                    Brend:
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="ZARA STUDIO / NIKE LAB"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                    Kiyim Toifasi:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-white font-mono"
                  >
                    {CLOTHING_CATEGORIES.filter(c => c !== 'Barchasi').map(cat => (
                      <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                    Davlat (Hub):
                  </label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-white font-mono"
                  >
                    <option value="Istanbul 🇹🇷" className="bg-black text-white">Istanbul 🇹🇷</option>
                    <option value="Dubay 🇦🇪" className="bg-black text-white">Dubay 🇦🇪</option>
                    <option value="Milano 🇮🇹" className="bg-black text-white">Milano 🇮🇹</option>
                    <option value="New York 🇺🇸" className="bg-black text-white">New York 🇺🇸</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                    Ombordagi Soni:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                    Narxi (so'm):
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="420000"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                    Eski Narxi (ixtiyoriy):
                  </label>
                  <input
                    type="text"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                    placeholder="500000"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              {/* Image Upload / URL */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <label className="block text-[10px] font-mono text-neutral-400 uppercase">
                  Libos Rasmi (Yuklash yoki URL):
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFile}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageProcessing}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white flex items-center justify-center gap-2 transition-colors shrink-0 font-mono"
                  >
                    <Upload className="w-4 h-4 text-white" />
                    <span>{imageProcessing ? 'Siqilmoqda...' : 'Fayldan tanlash'}</span>
                  </button>

                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="Yoki to'g'ridan-to'g'ri rasm linkini joylang (https://...)"
                    className="flex-1 bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white"
                  />
                </div>

                {imagePreview && (
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-20 rounded-lg object-cover border border-white/20"
                    />
                    <span className="text-xs text-white font-mono">
                      ✓ Rasm tayyor
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                    O'lchamlar (vergul bilan):
                  </label>
                  <input
                    type="text"
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                    placeholder="S, M, L, XL"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                    Ranglar (vergul bilan):
                  </label>
                  <input
                    type="text"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    placeholder="Qora, Oq, Grafit"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Katalogga Joylash</span>
              </button>
            </form>
          )}

          {/* TAB 3: DEPLETED (0 STOCK) ARCHIVE */}
          {activeTab === 'depleted' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 text-neutral-300 text-xs font-mono">
                Omborda soni 0 ta bo'lib qolgan va oddiy xaridorlarga ko'rinmaydigan liboslar ro'yxati. Yangi partiya kelganda sonini oshirishingiz mumkin.
              </div>

              {depletedProducts.length === 0 ? (
                <div className="p-8 text-center text-neutral-400 text-xs font-mono">
                  Ayni paytda omborda tugagan mahsulotlar yo'q. Barcha kiyimlar yetarli miqdorda mavjud.
                </div>
              ) : (
                depletedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-18 rounded-lg object-cover opacity-60 border border-white/10"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                          [ OMBORDA TUGAGAN ]
                        </span>
                        <h4 className="text-sm font-bold text-white">{p.name}</h4>
                        <span className="text-xs font-mono text-neutral-400">
                          {new Intl.NumberFormat('uz-UZ').format(p.price)} so'm
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateProduct(p.id, { stock: 5 })}
                        className="px-3.5 py-2 rounded-xl bg-white text-black font-bold text-xs font-mono uppercase transition-all"
                      >
                        +5 ta qo'shish
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: TELEGRAM BOT CONFIGURATION */}
          {activeTab === 'telegram' && (
            <form onSubmit={handleSaveTelegram} className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 text-neutral-300 text-xs space-y-2 font-mono">
                <p className="font-bold text-white flex items-center gap-2 uppercase">
                  <Send className="w-4 h-4 text-white" />
                  Telegram Bot va Admin Chat ID Ulash
                </p>
                <p className="text-[11px] leading-relaxed text-neutral-400">
                  Xaridor "Sotib olish" yoki "Zakas berish" tugmasini bosganda barcha buyurtma tafsilotlari va kiyim rasmi ushbu bot orqali to'g'ridan-to'g'ri Telegramingizga keladi.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                  Telegram Bot Token:
                </label>
                <input
                  type="text"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="BotFather bergan tokenni kiriting"
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-neutral-600 outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                  Telegram Chat ID yoki Guruh ID:
                </label>
                <input
                  type="text"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  placeholder="Chat ID kiriting (@userinfobot orqali bilish mumkin)"
                  className="w-full bg-[#141418] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-neutral-600 outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">
                  Admin Shaxsiy Telegram Username (ixtiyoriy):
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-mono text-white">@</span>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="admin_username"
                    className="w-full bg-[#141418] border border-white/15 rounded-xl pl-8 pr-3 py-2.5 text-xs text-white font-mono placeholder-neutral-600 outline-none focus:border-white"
                  />
                </div>
              </div>

              {testStatus.error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                  {testStatus.error}
                </div>
              )}
              {testStatus.success && (
                <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-mono">
                  ✓ Sinov xabari Telegramingizga muvaffaqiyatli bordi!
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Sozlamalarni Saqlash
                </button>

                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testStatus.loading}
                  className="px-5 py-3 rounded-xl bg-black hover:bg-white/10 text-white text-xs font-mono font-medium border border-white/20 transition-colors flex items-center gap-2"
                >
                  {testStatus.loading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-white" />
                  )}
                  <span>Sinov xabari</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
