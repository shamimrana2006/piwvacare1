"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS, PRODUCT_CATEGORIES, AGE_GROUPS } from "@/lib/data";

const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Rating", "New Arrivals", "Best Selling"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sort, setSort] = useState("Recommended");
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleAge = (age: string) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchAge = selectedAges.length === 0 || selectedAges.some((a) => p.ageGroup.includes(a.replace("–", "–")));
    const price = p.discountPrice ?? p.price;
    const matchPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchSearch && matchCat && matchAge && matchPrice;
  });

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-piwva-warm to-transparent py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3"
          >
            Baby Care Products
          </motion.h1>
          <p className="text-gray-500 mb-6">Quality, safe products for every stage of your baby's journey</p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search products, brands, categories..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white border border-piwva-beige text-sm outline-none focus:border-piwva-sage shadow-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Age Group Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
          <span className="text-sm font-semibold text-gray-600 flex-shrink-0">Age:</span>
          {AGE_GROUPS.map((ag) => (
            <button
              key={ag.id}
              onClick={() => toggleAge(ag.label)}
              className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedAges.includes(ag.label)
                  ? "bg-piwva-sage text-white border-piwva-sage"
                  : "bg-white text-gray-600 border-piwva-beige hover:border-piwva-sage"
              }`}
            >
              <span>{ag.emoji}</span>
              {ag.label}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-60 flex-shrink-0 space-y-5">
            {/* Categories */}
            <div className="bg-white rounded-2xl border border-piwva-beige/60 p-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Categories</h3>
              <div className="space-y-2">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 rounded border-piwva-beige accent-piwva-sage"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-piwva-sage transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-2xl border border-piwva-beige/60 p-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Price Range</h3>
              <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                <span>৳{priceRange[0].toLocaleString()}</span>
                <span>৳{priceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10000}
                step={100}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            {/* Clear Filters */}
            {(selectedCategories.length > 0 || selectedAges.length > 0) && (
              <button
                onClick={() => { setSelectedCategories([]); setSelectedAges([]); }}
                className="w-full h-9 rounded-xl border-2 border-dashed border-piwva-peach text-piwva-peach text-sm font-medium hover:bg-piwva-peach/10 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">{filtered.length}</span> products found
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-piwva-beige text-sm font-medium text-gray-600 hover:border-piwva-sage"
                >
                  <SlidersHorizontal size={15} />
                  Filter
                </button>
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-9 pl-3 pr-8 rounded-xl border border-piwva-beige text-sm text-gray-600 outline-none focus:border-piwva-sage bg-white appearance-none cursor-pointer"
                  >
                    {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-gray-500 font-medium">No products found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
