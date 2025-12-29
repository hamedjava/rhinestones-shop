import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] bg-primary-dark overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#082224] via-[#0F393B] to-[#1A5F63]">
         {/* Placeholder for Hero Image */}
         <div className="absolute right-0 top-0 h-full w-1/2 bg-white/5 opacity-20"></div> 
      </div>

      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-start text-white max-w-4xl">
        <h2 className="text-lg md:text-xl text-secondary mb-4 font-light">کلکسیون جدید ۲۰۲۵</h2>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          زیبایی ابدی <br />
          جواهرات فاخر
        </h1>
        <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
          مجموعه‌ای از بهترین سنگ‌های قیمتی و طراحی‌های منحصر به فرد که درخششی جاودانه به شما می‌بخشد.
        </p>
        <button className="bg-secondary hover:bg-white hover:text-primary text-primary-dark font-bold py-3 px-10 rounded-none transition duration-300 transform hover:scale-105">
          مشاهده مجموعه
        </button>
      </div>
    </section>
  );
}