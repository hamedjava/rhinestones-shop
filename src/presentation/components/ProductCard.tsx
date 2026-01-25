"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/domain/models/Product";
import { ShoppingBag, Eye } from "lucide-react";
import { useCart } from "@/core/contexts/CartContext"; // اتصال به کانتکست

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart(); // استفاده از هوک

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // جلوگیری از باز شدن صفحه محصول
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 relative flex flex-col h-full" dir="rtl">
      
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <Link href={`/shop/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {product.isFeatured && (
            <span className="bg-black/90 text-white text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
              ویژه
            </span>
          )}
          {product.category && (
            <span className="bg-white/90 text-gray-800 text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm border border-gray-100/50">
              {product.category}
            </span>
          )}
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Link 
              href={`/shop/${product.id}`}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-primary-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
              title="مشاهده جزئیات"
            >
               <Eye className="w-5 h-5" />
            </Link>
            <button 
              onClick={handleAddToCart} // اتصال تابع کلیک
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-primary-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg cursor-pointer"
              title="افزودن به سبد"
            >
               <ShoppingBag className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col justify-between text-right">
        <div>
           <Link href={`/shop/${product.id}`}>
            <h3 className="font-medium text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <div className="text-sm text-gray-500 mb-3 line-clamp-2 min-h-[2.5rem]">
             {product.description}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-50">
           <span className="text-lg font-bold text-gray-900 font-mono tracking-tight">
             {product.price} <span className="text-sm font-normal text-gray-500 mr-1">تومان</span>
           </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
