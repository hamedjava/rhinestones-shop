import { Product } from "@/core/entities/Product";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl hover:border-secondary/30">
      <div className="relative w-full h-64 mb-4 overflow-hidden bg-gray-50 flex items-center justify-center">
        {product.isNew && (
            <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 z-10">جدید</span>
        )}
        <div className="w-40 h-40 bg-gray-200 rounded-full group-hover:scale-110 transition duration-500 flex items-center justify-center text-gray-400 text-xs">
            تصویر محصول
        </div>
        <button className="absolute bottom-0 w-full bg-primary text-white py-2 translate-y-full group-hover:translate-y-0 transition duration-300">
            افزودن به سبد
        </button>
      </div>
      <div className="text-center">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-bold text-lg text-primary mb-2 line-clamp-1">{product.title}</h3>
        <div className="flex justify-center gap-0.5 mb-3 text-secondary">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < (product.rating || 0) ? "currentColor" : "none"} className={i < (product.rating || 0) ? "text-secondary" : "text-gray-300"} />
            ))}
        </div>
        <div className="text-lg font-bold text-primary">
          {product.price.toLocaleString('fa-IR')} <span className="text-sm font-normal text-gray-500">تومان</span>
        </div>
      </div>
    </div>
  );
}