"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/domain/models/Product"; // مسیر اصلاح شد
import ProductCard from "@/presentation/components/ProductCard";

interface NewArrivalsProps {
  products: Product[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <section className="container mx-auto px-4 py-16" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10">
        <div className="text-right w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">جدیدترین محصولات</h2>
          <p className="text-gray-500 mt-2 text-lg">زیبایی و درخشش را با کالکشن جدید تجربه کنید</p>
        </div>
        <Link 
          href="/shop" 
          className="hidden md:inline-flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors whitespace-nowrap"
        >
          مشاهده همه محصولات
          {/* آیکون فلش چپ برای زبان فارسی */}
          <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="mt-10 text-center md:hidden">
        <Link href="/shop" className="bg-black text-white px-6 py-3 rounded-lg inline-block">
          مشاهده همه
        </Link>
      </div>
    </section>
  );
};

export default NewArrivals;
