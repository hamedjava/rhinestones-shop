import { ProductRepository } from "@/infrastructure/repositories/ProductRepository"; // ایمپورت صحیح کلاس
import Header from "@/presentation/components/Header";
import Footer from "@/presentation/components/Footer";
import HeroSection from "@/presentation/modules/HeroSection";
import NewArrivals from "@/presentation/modules/NewArrivals";

export default function Home() {
  // دریافت داده‌ها از ریپازیتوری (چون داده‌های ما فعلاً Mock هستند، نیازی به await نیست)
  // اگر دیتابیس واقعی بود، باید متد را async می‌کردیم.
  const products = ProductRepository.getFeatured();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* هدر */}
      <Header />
      
      {/* بخش قهرمان */}
      <HeroSection />
      
      {/* بخش بنرهای تبلیغاتی */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-64 w-full">
         <div className="bg-[#f5f5f5] h-64 md:h-full flex items-center justify-center relative overflow-hidden group cursor-pointer border-b md:border-b-0 md:border-l border-white hover:bg-gray-200 transition-colors">
            <div className="z-10 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-serif">کالکشن عروس</h3>
                <span className="text-sm border-b border-gray-800 pb-1 text-gray-600">مشاهده جزئیات</span>
            </div>
         </div>
         <div className="bg-[#D4AF37] h-64 md:h-full flex items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-[#c4a02e] transition-colors">
            <div className="z-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-2 font-serif">هدیه‌های خاص</h3>
                <span className="text-sm border-b border-white text-white pb-1">خرید کنید</span>
            </div>
         </div>
      </section>

      {/* لیست محصولات جدید (داده‌ها به عنوان Props پاس داده می‌شوند) */}
      <NewArrivals products={products} />

      {/* بخش سفارشی سازی */}
      <section className="bg-gray-900 py-20 text-white text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-serif mb-6">سفارشی سازی جواهرات</h2>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8 leading-relaxed">
                ما طرح رویایی شما را به واقعیت تبدیل می‌کنیم. با طراحان ما در تماس باشید تا قطعه‌ای منحصر به فرد مختص خودتان داشته باشید.
            </p>
            <button className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white px-8 py-3 transition duration-300 rounded-sm">
                دریافت مشاوره رایگان
            </button>
        </div>
      </section>

      {/* فوتر */}
      <Footer />
    </main>
  );
}
