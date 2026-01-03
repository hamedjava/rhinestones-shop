"use client";

import React, { useState, useMemo } from "react";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";
import ProductCard from "@/presentation/components/ProductCard";

export default function ShopPage() {
  const allProducts = ProductRepository.getAll();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // استخراج دسته‌بندی‌ها از دیتای فارسی
  const categories = ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))];

  // منطق فیلتر کردن
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, allProducts]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        
        {/* هدر صفحه */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">فروشگاه طلا و جواهر</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            درخشش و زیبایی ابدی را با کلکسیون بی‌نظیر و دست‌ساز ما تجربه کنید.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* سایدبار فیلتر */}
          <aside className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">جستجو</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="نام محصول..."
                    // نکته: pr-10 برای فاصله از راست (آیکون) و pl-4 برای چپ
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-right"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {/* آیکون ذره‌بین در سمت راست */}
                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">دسته‌بندی‌ها</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-right px-4 py-3 rounded-lg transition-all duration-200 flex justify-between items-center ${
                          selectedCategory === category
                            ? "bg-black text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {/* نمایش "همه محصولات" به جای "All" */}
                        <span className="font-medium">{category === "All" ? "همه محصولات" : category}</span>
                        {selectedCategory === category && <span className="text-amber-400">•</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* لیست محصولات */}
          <main className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-gray-600 font-medium">
                نمایش <span className="text-black font-bold mx-1">{filteredProducts.length.toLocaleString('fa-IR')}</span> محصول
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="text-6xl mb-4 grayscale opacity-50">💎</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">محصولی یافت نشد</h3>
                <p className="text-gray-500 mb-6">لطفاً جستجو یا فیلترهای خود را تغییر دهید.</p>
                <button 
                  onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
                  className="text-amber-600 font-semibold hover:underline"
                >
                  حذف تمام فیلترها
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
