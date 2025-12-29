import { Product } from "@/core/entities/Product";
import ProductCard from "../components/ProductCard";

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">جدیدترین جواهرات</h2>
            <p className="text-gray-500">انتخابی خاص برای سلیقه‌های خاص</p>
          </div>
          <button className="text-primary font-bold hover:text-secondary transition flex items-center gap-2">
            مشاهده همه <span>&larr;</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}