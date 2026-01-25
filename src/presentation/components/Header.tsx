"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/core/contexts/CartContext";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const { toggleCart, cartCount } = useCart();
  
  // ترفند برای جلوگیری از ارور Hydration در نکست جی‌اس
  const [mounted, setMounted] = useState(false);
  
  // استیت برای مدیریت وضعیت نمایش باکس جستجو
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // فوکوس خودکار روی اینپوت وقتی سرچ باز می‌شود
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  return (
    <>
      <header className="bg-primary text-white py-4 shadow-md sticky top-0 z-40 relative">
        <div className="container mx-auto px-6 flex items-center justify-between relative">
          
          {/* --- اصلاح لوگو: تبدیل به لینک --- */}
          <Link href="/" className="text-2xl font-bold tracking-wider text-secondary z-50 relative hover:opacity-80 transition-opacity">
            زمــرد
          </Link>
          
          {/* نویگیشن بار (وقتی سرچ باز است کمی محو می‌شود تا تمرکز روی سرچ باشد) */}
          <nav 
            className={`hidden md:flex items-center gap-8 text-sm font-medium transition-all duration-300 ease-in-out ${isSearchOpen ? 'opacity-0 pointer-events-none translate-y-2' : 'opacity-100 translate-y-0'}`}
          >
            <Link href="/" className="hover:text-secondary transition">صفحه اصلی</Link>
            <Link href="/shop" className="hover:text-secondary transition">فروشگاه</Link>
            <Link href="/necklaces" className="hover:text-secondary transition">گردنبند</Link>
            <Link href="/bracelets" className="hover:text-secondary transition">دستبند</Link>
            <Link href="/blog" className="hover:text-secondary transition">مجله</Link>
          </nav>
          
          {/* سمت چپ هدر (آیکون‌ها) */}
          <div className="flex items-center gap-6 z-50 relative">
            {/* دکمه سرچ */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-secondary transition cursor-pointer flex items-center justify-center w-6 h-6"
              aria-label="جستجو"
            >
              <div className="relative w-5 h-5">
                <Search 
                    className={`w-5 h-5 absolute top-0 left-0 transition-all duration-300 ${isSearchOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
                />
                <X 
                    className={`w-5 h-5 absolute top-0 left-0 transition-all duration-300 ${isSearchOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
                />
              </div>
            </button>
            
            {/* دکمه سبد خرید */}
            <button 
              onClick={toggleCart} 
              className="hover:text-secondary transition relative p-1"
              aria-label="سبد خرید"
            >
               <ShoppingBag className="w-5 h-5" />
               {/* نمایش بج فقط اگر آیتمی باشد و کامپوننت مانت شده باشد */}
               {mounted && cartCount > 0 && (
                 <span className="absolute -top-2 -right-2 bg-secondary text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                   {cartCount}
                 </span>
               )}
            </button>
            
            <Link href="/auth/login" className="hover:text-secondary transition" aria-label="حساب کاربری">
               <User className="w-5 h-5" />
            </Link>
          </div>

          {/* --- باکس جستجوی انیمیشنی --- */}
          <div 
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-full shadow-2xl overflow-hidden transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) origin-center z-40
              ${isSearchOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-90 invisible pointer-events-none'}`}
          >
              <div className="flex items-center px-4 py-2">
                  <Search className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
                  <input 
                      ref={searchInputRef}
                      type="text" 
                      placeholder="جستجو در محصولات..." 
                      className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-sm h-9 px-2"
                  />
              </div>
          </div>

        </div>
      </header>
      
      {/* (اختیاری) لایه تاریک پشت صفحه وقتی سرچ باز است */}
      {/* این لایه خارج از هدر رندر می‌شود تا روی محتوای صفحه بیفتد */}
      <div 
        onClick={() => setIsSearchOpen(false)}
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        style={{ top: '64px' }} // تنظیم فاصله از بالا برای اینکه هدر پوشانده نشود
      ></div>
    </>
  );
}
