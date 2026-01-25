"use client";

import { useState, useMemo } from "react";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";
import ProductCard from "@/presentation/components/ProductCard";
import { Product } from "@/domain/models/Product"; // مسیر اصلاح شد
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // دریافت همه محصولات
  const products = ProductRepository.getAll();

  // استخراج دسته‌بندی‌های یکتا
  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  // فیلتر کردن محصولات
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="bg-white min-h-screen pb-20" dir="rtl">
      {/* Header Section */}
      <div className="bg-gray-50 border-b border-gray-100 py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            مجموعه جواهرات
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            از کالکشن بی‌نظیر ما دیدن کنید؛ ترکیبی از هنر دست و زیبایی جاودانه برای لحظات خاص شما.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters (Desktop: Right Side due to RTL) */}
          <aside className="w-full lg:w-1/4 space-y-8">
            {/* Search */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <Search className="w-5 h-5 text-primary-500" />
                جستجو
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="نام محصول..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <SlidersHorizontal className="w-5 h-5 text-primary-500" />
                دسته‌بندی‌ها
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-right px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-between group ${
                      selectedCategory === category
                        ? "bg-primary-50 text-primary-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="capitalize">
                      {category === "all" ? "همه محصولات" : category}
                    </span>
                    {selectedCategory === category && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="w-full lg:w-3/4">
            {/* Results Count & Active Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-gray-500 text-sm">
                نمایش <span className="font-semibold text-gray-900">{filteredProducts.length}</span> محصول
              </span>
              
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-red-500 text-sm hover:text-red-600 flex items-center gap-1 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  پاک کردن فیلترها
                </button>
              )}
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">محصولی یافت نشد</h3>
                <p className="text-gray-500 text-sm">
                  لطفاً کلمات کلیدی یا فیلترهای خود را تغییر دهید.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
