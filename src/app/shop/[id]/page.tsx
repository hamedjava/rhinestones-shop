"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";
import ProductCard from "@/presentation/components/ProductCard";
import { Product } from "@/domain/models/Product"; // مسیر اصلاح شد

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>("");

  // دریافت اطلاعات محصول بر اساس ID موجود در URL
  useEffect(() => {
    if (params.id) {
      // هندل کردن ID که ممکن است آرایه باشد (در نکست جی‌اس) و استفاده به عنوان رشته
      const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundProduct = ProductRepository.getById(rawId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        // تنظیم تصویر اولیه از آرایه تصاویر
        setActiveImage(foundProduct.images[0]);
      } else {
        // اگر محصول پیدا نشد
        // router.push("/shop"); // می‌توانید این خط را فعال کنید
      }
    }
  }, [params.id, router]);

  if (!product) return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>;

  // پیدا کردن محصولات مشابه (هم‌دسته)
  const relatedProducts = ProductRepository.getAll()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3); // فقط ۳ مورد اول

  // توابع هندل کردن تعداد
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // افزودن به سبد
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart.`);
    alert(`${quantity} عدد "${product.name}" به سبد خرید اضافه شد.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12" dir="rtl">
      <div className="container mx-auto px-4">
        
        {/* مسیر نان ریز (Breadcrumb) */}
        <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-black transition">خانه</a>
          <span>/</span>
          <a href="/shop" className="hover:text-black transition">فروشگاه</a>
          <span>/</span>
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* بخش تصاویر محصول */}
            <div className="p-8 bg-gray-50 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-l border-gray-100">
              <div className="relative w-full max-w-md aspect-square mb-6 rounded-xl overflow-hidden shadow-sm bg-white">
                 {/* تصویر اصلی */}
                <Image
                  src={activeImage || product.images[0]} // فال‌بک به تصویر اول
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                />
              </div>
              
              {/* تامبنیل‌ها (نمایش تصاویر واقعی محصول) */}
              <div className="flex gap-4 overflow-x-auto pb-2 w-full justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === img ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`thumb-${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* بخش اطلاعات محصول */}
            <div className="p-8 lg:p-12 flex flex-col text-right">
              <div className="mb-auto">
                <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold mb-4">
                  {product.category}
                </span>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price.toLocaleString("fa-IR")} <span className="text-base text-gray-500 font-normal">تومان</span>
                  </span>
                  {/* امتیاز فیک برای زیبایی */}
                  <div className="flex text-yellow-400 text-sm">
                    ★★★★★ <span className="text-gray-400 mr-1">(۴.۸)</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8 text-justify pl-4">
                  {product.description}
                  <br />
                  این محصول با استفاده از طلای ۱۸ عیار استاندارد ساخته شده و دارای کد پیگیری اتحادیه طلا و جواهر می‌باشد. طراحی ارگونومیک آن باعث می‌شود در استفاده طولانی مدت احساس راحتی داشته باشید.
                </p>

                {/* ویژگی‌های محصول (استاتیک برای دمو) */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500 mb-1">عیار</span>
                    <span className="font-semibold text-gray-800">۱۸ عیار (750)</span>
                  </div>
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500 mb-1">رنگ</span>
                    <span className="font-semibold text-gray-800">زرد / سفید</span>
                  </div>
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500 mb-1">وزن حدودی</span>
                    <span className="font-semibold text-gray-800">۴.۳۵ گرم</span>
                  </div>
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500 mb-1">گارانتی</span>
                    <span className="font-semibold text-gray-800">مادام‌العمر</span>
                  </div>
                </div>
              </div>

              {/* دکمه‌های خرید */}
              <div className="border-t border-gray-100 pt-8 mt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  
                  {/* انتخاب تعداد */}
                  <div className="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 sm:w-32">
                    <button onClick={decreaseQty} className="text-xl font-bold text-gray-500 hover:text-black w-8">-</button>
                    <span className="font-bold text-gray-900">{quantity.toLocaleString("fa-IR")}</span>
                    <button onClick={increaseQty} className="text-xl font-bold text-gray-500 hover:text-black w-8">+</button>
                  </div>

                  {/* دکمه افزودن به سبد */}
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    افزودن به سبد خرید
                  </button>

                  {/* دکمه علاقه‌مندی (نمادین) */}
                  <button className="p-3 border border-gray-300 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بخش محصولات مرتبط */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 border-r-4 border-black pr-4">محصولات مشابه</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
