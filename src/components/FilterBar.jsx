import React from 'react';
import { LayoutGrid, Grid3X3, ArrowUpDown, SlidersHorizontal, Ruler } from 'lucide-react';

export default function FilterBar({
  sortBy,
  onSortChange,
  showOnlyAvailable,
  onToggleOnlyAvailable,
  viewMode,
  onToggleViewMode,
  totalItems,
  selectedCategory,
  onOpenCatalog,
  onOpenSizeAdvisor,
  quickFilter = 'all',
  onQuickFilterChange
}) {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 my-6">
      
      {/* Quick Filter Pills Row (Bestsellerlar, Yangilar, Chegirmalar) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-3 border-b border-neutral-100">
        <span className="text-[11px] font-mono text-neutral-600 font-bold uppercase shrink-0 mr-1">
          Kolleksiya:
        </span>
        {[
          { id: 'all', label: 'Barcha Liboslar' },
          { id: 'bestseller', label: '🔥 Bestsellerlar' },
          { id: 'new', label: '✨ Yangi Kelganlar' },
          { id: 'sale', label: '⚡ Katta Chegirmalar' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => onQuickFilterChange && onQuickFilterChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              quickFilter === tab.id
                ? 'bg-black text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        
        {/* Left: Active Category & Catalog Opener Shortcut + Size Advisor */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCatalog}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xs font-mono font-bold text-black transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Toifa: {selectedCategory}</span>
          </button>

          <button
            onClick={onOpenSizeAdvisor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-50 border border-neutral-300 text-xs font-mono text-neutral-800 transition-all cursor-pointer"
            title="Bo'y va vazningizga mos o'lchamni aniqlash"
          >
            <Ruler className="w-3.5 h-3.5 text-black" />
            <span>O'lcham maslahatchisi</span>
          </button>
          
          <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
            {totalItems} ta mahsulot topildi
          </span>
        </div>

        {/* Right Controls: Availability, Sort, Grid View */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Fast Delivery / In-Stock Toggle */}
          <button
            onClick={onToggleOnlyAvailable}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full border font-mono text-xs transition-all cursor-pointer ${
              showOnlyAvailable
                ? 'bg-black text-white border-black font-bold shadow-sm'
                : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:text-black hover:border-black'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${showOnlyAvailable ? 'bg-white animate-pulse' : 'bg-neutral-400'}`} />
            <span>Faqat Toshkentda bor</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 font-mono text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-black cursor-pointer pr-1 font-mono"
            >
              <option value="default">Standart saralash</option>
              <option value="price-asc">Narx: Avval arzon</option>
              <option value="price-desc">Narx: Avval qimmat</option>
              <option value="discount">Katta chegirma</option>
            </select>
          </div>

          {/* Grid Layout Switcher */}
          <div className="hidden sm:flex items-center bg-neutral-100 p-1 rounded-full border border-neutral-300">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-black shadow-sm font-bold' : 'text-neutral-500 hover:text-black'
              }`}
              title="4-ustunli vitrina"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleViewMode('duo')}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                viewMode === 'duo' ? 'bg-white text-black shadow-sm font-bold' : 'text-neutral-500 hover:text-black'
              }`}
              title="2-ustunli lookbook"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
