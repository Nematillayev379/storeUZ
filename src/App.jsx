import React, { useState, useEffect, useMemo } from 'react';
import TopBarMarquee from './components/TopBarMarquee';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CuratedCollections from './components/CuratedCollections';
import LimitedDropSpotlight from './components/LimitedDropSpotlight';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import LookbookSection from './components/LookbookSection';
import CommunityStreetstyle from './components/CommunityStreetstyle';
import ProcessSection from './components/ProcessSection';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import VipBanner from './components/VipBanner';
import LiveSalesToast from './components/LiveSalesToast';
import ConciergeFloatingButton from './components/ConciergeFloatingButton';
import SizeAdvisorModal from './components/SizeAdvisorModal';
import BuyModal from './components/BuyModal';
import PreOrderModal from './components/PreOrderModal';
import AdminModal from './components/AdminModal';
import WishlistModal from './components/WishlistModal';
import Footer from './components/Footer';
import { INITIAL_PRODUCTS, CLOTHING_CATEGORIES } from './data/initialProducts';
import { sendOutOfStockAlert } from './services/telegramService';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const PRODUCTS_STORAGE_KEY = 'atelier_noir_products_v8';
const WISHLIST_STORAGE_KEY = 'atelier_noir_wishlist_v8';
const ITEMS_PER_PAGE = 8;

export default function App() {
  // 1. Products State with LocalStorage persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("LocalStorage parse error:", e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products to localStorage:", e);
    }
  }, [products]);

  // 2. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // 3. Navigation / View state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (4 cols) | 'duo' (2 cols)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 4. Modals
  const [buyModalProduct, setBuyModalProduct] = useState(null);
  const [preOrderModalProduct, setPreOrderModalProduct] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // 5. Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [quickFilter, setQuickFilter] = useState('all'); // 'all' | 'bestseller' | 'new' | 'sale'

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, showOnlyAvailable, sortBy, quickFilter]);

  // Toggle wishlist
  const handleToggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Stock deduction on purchase + Out-of-Stock Alert to Telegram Bot
  const handleOrderSuccess = (productId, quantityBought = 1) => {
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        if (p.id === productId) {
          const newStock = Math.max(0, (p.stock || 0) - quantityBought);
          
          if (newStock === 0) {
            sendOutOfStockAlert(p);
          }

          return {
            ...p,
            stock: newStock,
            status: newStock > 0 ? 'in_stock' : 'out_of_stock'
          };
        }
        return p;
      });
    });

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => {
        const newStock = Math.max(0, (prev.stock || 0) - quantityBought);
        return { ...prev, stock: newStock };
      });
    }
  };

  // Admin actions: Add, Update, Delete
  const handleAddProduct = (newProd) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const handleUpdateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(prev => ({ ...prev, ...updates }));
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setWishlist(prev => prev.filter(item => item !== id));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }
  };

  // Customer visible catalogue (Hidden when stock <= 0 as requested by user)
  const visibleProducts = useMemo(() => {
    return products.filter(product => {
      // Auto-hide if stock is 0 or marked hidden
      if (product.stock <= 0 || product.isHidden) {
        return false;
      }

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(q);
        const matchesBrand = product.brand?.toLowerCase().includes(q);
        const matchesCat = product.category?.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat) {
          return false;
        }
      }

      // Filter primarily by Clothing Category
      if (selectedCategory !== 'Barchasi' && product.category !== selectedCategory) {
        return false;
      }

      if (showOnlyAvailable && product.stock <= 0) {
        return false;
      }

      // Quick Collection Pills filter
      if (quickFilter === 'bestseller') {
        const isBestseller = (product.discount && product.discount >= 20) || product.price > 350000 || product.stock <= 3;
        if (!isBestseller) return false;
      } else if (quickFilter === 'new') {
        const isNewDrop = ['prod-1', 'prod-2', 'hd-01', 'dj-01', 'kj-01', 'sn-01'].includes(product.id) || product.isNew;
        if (!isNewDrop) return false;
      } else if (quickFilter === 'sale') {
        const isSale = (product.discount && product.discount > 0) || (product.oldPrice && product.oldPrice > product.price);
        if (!isSale) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
      return 0;
    });
  }, [products, searchTerm, selectedCategory, showOnlyAvailable, sortBy, quickFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(visibleProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return visibleProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [visibleProducts, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const el = document.getElementById('catalogue');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const wishlistItems = useMemo(() => {
    return products.filter(p => wishlist.includes(p.id));
  }, [products, wishlist]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-[#111111] antialiased selection:bg-black selection:text-white">
      
      {/* Fixed Frosted Glass Header (TopBarMarquee + Navbar with backdrop-blur) */}
      <header className="fixed top-0 inset-x-0 z-40 w-full transition-all pointer-events-auto">
        <TopBarMarquee />
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          wishlistCount={wishlist.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          isCatalogOpen={isCatalogOpen}
          setIsCatalogOpen={setIsCatalogOpen}
          onGoHome={() => {
            setSelectedProduct(null);
            setSelectedCategory('Barchasi');
            setQuickFilter('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          products={products}
        />
      </header>

      {/* 2. Main Middle View */}
      <main className={`flex-1 w-full ${selectedProduct ? 'pt-28 sm:pt-36' : ''}`}>
        {selectedProduct ? (
          /* SINGLE PRODUCT DETAIL VIEW */
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onBuyNow={(prod) => setBuyModalProduct(prod)}
            onPreOrder={(prod) => setPreOrderModalProduct(prod)}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        ) : (
          /* FULL COMMERCIAL STORE RUNWAY */
          <>
            {/* Real Store Banner Carousel with Slider & Pagination */}
            <HeroBanner
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              onExploreClick={() => {
                const el = document.getElementById('catalogue');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Curated Capsules Showcase (Desktop/Tablet Only - Hidden on mobile to keep focus on products) */}
            <div className="hidden md:block">
              <CuratedCollections
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onScrollToCatalogue={() => {
                  const el = document.getElementById('catalogue');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>

            {/* Limited Drop Spotlight (Desktop/Tablet Only - Hidden on mobile) */}
            <div className="hidden md:block">
              <LimitedDropSpotlight
                products={products}
                onBuyProduct={(prod) => setBuyModalProduct(prod)}
                onSelectProduct={(prod) => setSelectedProduct(prod)}
              />
            </div>

            {/* Filter & Controls Toolbar with Size Advisor trigger & Quick Collections */}
            <div id="catalogue" className="w-full scroll-mt-28">
              <FilterBar
                sortBy={sortBy}
                onSortChange={setSortBy}
                showOnlyAvailable={showOnlyAvailable}
                onToggleOnlyAvailable={() => setShowOnlyAvailable(prev => !prev)}
                viewMode={viewMode}
                onToggleViewMode={setViewMode}
                totalItems={visibleProducts.length}
                selectedCategory={selectedCategory}
                onOpenCatalog={() => setIsCatalogOpen(prev => !prev)}
                onOpenSizeAdvisor={() => setIsSizeAdvisorOpen(true)}
                quickFilter={quickFilter}
                onQuickFilterChange={setQuickFilter}
              />
            </div>

            {/* Products Runway Showcase Grid */}
            <div className="w-full px-3 sm:px-8 lg:px-12 pb-16">
              
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-6 border-b border-neutral-200 gap-2">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 block mb-0.5">
                    DO'KON VITRINASI // {selectedCategory.toUpperCase()}
                  </span>
                  <h2 className="text-lg sm:text-2xl font-display font-extrabold tracking-tight text-black uppercase">
                    {selectedCategory === 'Barchasi' ? 'Barcha Original Liboslar' : selectedCategory} ({visibleProducts.length})
                  </h2>
                </div>

                <button
                  onClick={() => setIsCatalogOpen(prev => !prev)}
                  className="text-xs font-mono font-bold text-neutral-600 hover:text-black hover:underline cursor-pointer w-fit"
                >
                  Boshqa toifani tanlash ▾
                </button>
              </div>

              {/* Empty state */}
              {visibleProducts.length === 0 ? (
                <div className="text-center py-16 sm:py-20 rounded-2xl bg-neutral-50 border border-neutral-200 p-6 sm:p-8 max-w-xl mx-auto">
                  <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-neutral-500 shadow-sm">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-black mb-1 uppercase font-mono">
                    Mos liboslar topilmadi
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono max-w-sm mx-auto mb-6">
                    Boshqa toifani tanlab ko'ring yoki qidiruv so'zini tozalang.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('Barchasi');
                      setShowOnlyAvailable(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold font-mono uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer"
                  >
                    Filtrlarni tozalash
                  </button>
                </div>
              ) : (
                <>
                  {/* Dynamic Product Grid - 2 cols on mobile, 3 on tablet, 4 on desktop */}
                  <div className={`grid ${
                    viewMode === 'duo' 
                      ? 'grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 lg:gap-10' 
                      : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6'
                  }`}>
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelectProduct={(prod) => setSelectedProduct(prod)}
                        onBuyNow={(prod) => setBuyModalProduct(prod)}
                        onPreOrder={(prod) => setPreOrderModalProduct(prod)}
                        isWishlisted={wishlist.includes(product.id)}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    ))}
                  </div>

                  {/* Real Pagination Controls (Responsive) */}
                  {totalPages > 1 && (
                    <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-xs">
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 px-2.5 sm:px-3.5 py-2 rounded-lg border border-neutral-300 hover:border-black text-black disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-[11px] sm:text-xs"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Oldingi</span>
                      </button>

                      <div className="flex items-center gap-1 sm:gap-1.5 mx-1 sm:mx-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                              currentPage === pageNum
                                ? 'bg-black text-white shadow-sm'
                                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200'
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 px-2.5 sm:px-3.5 py-2 rounded-lg border border-neutral-300 hover:border-black text-black disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-[11px] sm:text-xs"
                      >
                        <span className="hidden sm:inline">Keyingi</span>
                        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}

            </div>

            {/* 3. Look of the Week (Desktop/Tablet Only) */}
            <div className="hidden md:block">
              <LookbookSection 
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onBuyNow={(p) => setBuyModalProduct(p)}
              />
            </div>

            {/* 4. Community Streetstyle Showcase (#AtelierNoir - Desktop/Tablet Only) */}
            <div className="hidden md:block">
              <CommunityStreetstyle
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            </div>

            {/* 5. Import & Delivery Process (Desktop/Tablet Only) */}
            <div className="hidden md:block">
              <ProcessSection />
            </div>

            {/* 6. Verified Customer Reviews */}
            <ReviewsSection />

            {/* 7. Frequently Asked Questions (FAQ Accordion) */}
            <FaqSection />

            {/* 8. VIP Telegram Club Banner (Desktop/Tablet Only) */}
            <div className="hidden md:block">
              <VipBanner />
            </div>

          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Live Sales Toast Notification */}
      <LiveSalesToast />

      {/* Floating Telegram Stylist Concierge */}
      <ConciergeFloatingButton />

      {/* 9. Modals */}
      {buyModalProduct && (
        <BuyModal
          product={buyModalProduct}
          onClose={() => setBuyModalProduct(null)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {preOrderModalProduct && (
        <PreOrderModal
          product={preOrderModalProduct}
          onClose={() => setPreOrderModalProduct(null)}
        />
      )}

      <SizeAdvisorModal
        isOpen={isSizeAdvisorOpen}
        onClose={() => setIsSizeAdvisorOpen(false)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveItem={handleToggleWishlist}
        onBuyNow={(prod) => {
          setIsWishlistOpen(false);
          setBuyModalProduct(prod);
        }}
      />

    </div>
  );
}
