import { getFeaturedProducts } from "@/infrastructure/repositories/ProductRepository";
import Header from "@/presentation/components/Header";
import Footer from "@/presentation/components/Footer";
import HeroSection from "@/presentation/modules/HeroSection";
import NewArrivals from "@/presentation/modules/NewArrivals";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      
      <section className="grid grid-cols-2 h-64 w-full">
         <div className="bg-[#EBEBEB] flex items-center justify-center relative overflow-hidden group cursor-pointer border-l border-white">
            <div className="z-10 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">کالکشن عروس</h3>
                <span className="text-sm border-b border-primary pb-1">مشاهده</span>
            </div>
         </div>
         <div className="bg-[#D4AF37] flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="z-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">هدیه‌های خاص</h3>
                <span className="text-sm border-b border-white text-white pb-1">خرید کنید</span>
            </div>
         </div>
      </section>

      <NewArrivals products={products} />

      <section className="bg-primary py-20 text-white text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-serif mb-6">سفارشی سازی جواهرات</h2>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8">
                ما طرح رویایی شما را به واقعیت تبدیل می‌کنیم. با طراحان ما در تماس باشید تا قطعه‌ای منحصر به فرد مختص خودتان داشته باشید.
            </p>
            <button className="border border-secondary text-secondary hover:bg-secondary hover:text-primary px-8 py-3 transition duration-300">
                مشاوره رایگان
            </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}