"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/core/entities/Product";
import { useCart } from "@/core/contexts/CartContext"; 

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // جلوگیری از رفتن به صفحه محصول هنگام کلیک روی دکمه خرید
    e.stopPropagation();

    // افزودن به سبد خرید
    // استفاده از as any برای سازگاری با کانتکست فعلی
    addToCart(product as any);
  };

  return (
    <Link href={`/shop/${product.id}`} className="block h-full">
      <div className="group bg-white border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl hover:border-secondary/30 rounded-lg h-full flex flex-col font-sans">
        
        {/* بخش تصویر */}
        <div className="relative w-full h-64 mb-4 overflow-hidden bg-gray-50 flex items-center justify-center rounded-md">
          {/* برچسب ویژه (فارسی) */}
          {product.isFeatured && (
              <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 z-10 rounded font-medium">
                پیشنهاد ویژه
              </span>
          )}
          
          {/* نمایش تصویر */}
          {product.image ? (
             <div className="relative w-full h-full group-hover:scale-105 transition duration-500">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-full object-cover object-center"
               />
             </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                <span className="text-4xl mb-2">📷</span>
                <span className="text-sm">تصویر محصول</span>
            </div>
          )}
          
          {/* دکمه افزودن به سبد (فارسی) */}
          <button 
              onClick={handleAddToCart}
              className="absolute bottom-0 w-full bg-primary text-white py-3 font-medium translate-y-full group-hover:translate-y-0 transition duration-300 hover:bg-opacity-90 cursor-pointer flex items-center justify-center z-20 shadow-md"
          >
              افزودن به سبد خرید
          </button>
        </div>
        
        {/* بخش اطلاعات متنی */}
        <div className="text-center mt-auto px-1">
          {/* دسته‌بندی (که الان از دیتا فارسی می‌آید) */}
          <div className="text-xs text-gray-500 mb-2">{product.category}</div>
          
          {/* نام محصول */}
          <h3 className="font-bold text-lg text-primary mb-2 line-clamp-1 leading-relaxed">
            {product.name}
          </h3>
          
          {/* قیمت (فارسی سازی اعداد و واحد پول) */}
          <div className="text-lg font-bold text-primary mt-2">
            {Number(product.price).toLocaleString('fa-IR')} 
            <span className="text-sm font-normal text-gray-500 mr-1">تومان</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
