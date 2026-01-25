"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/core/contexts/CartContext";
import { useEffect, useState } from "react";

export default function Header() {
  const { toggleCart, cartCount } = useCart();
  
  // ترفند برای جلوگیری از ارور Hydration در نکست جی‌اس
  // عدد سبد خرید فقط در کلاینت رندر می‌شود
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-primary text-white py-4 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wider text-secondary">زمــرد</div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-secondary transition">صفحه اصلی</Link>
          <Link href="/shop" className="hover:text-secondary transition">فروشگاه</Link>
          <Link href="/necklaces" className="hover:text-secondary transition">گردنبند</Link>
          <Link href="/bracelets" className="hover:text-secondary transition">دستبند</Link>
          <Link href="/blog" className="hover:text-secondary transition">مجله</Link>
        </nav>
        
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 hover:text-secondary transition cursor-pointer" />
          
          {/* دکمه سبد خرید */}
          <button 
            onClick={toggleCart} 
            className="hover:text-secondary transition relative p-1"
          >
             <ShoppingBag className="w-5 h-5" />
             {/* نمایش بج فقط اگر آیتمی باشد و کامپوننت مانت شده باشد */}
             {mounted && cartCount > 0 && (
               <span className="absolute -top-2 -right-2 bg-secondary text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                 {cartCount}
               </span>
             )}
          </button>
          
          <Link href="/auth/login" className="hover:text-secondary transition">
             <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
