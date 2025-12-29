import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wider text-secondary">زمــرد</div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-secondary transition">صفحه اصلی</Link>
          <Link href="/rings" className="hover:text-secondary transition">انگشتر</Link>
          <Link href="/necklaces" className="hover:text-secondary transition">گردنبند</Link>
          <Link href="/bracelets" className="hover:text-secondary transition">دستبند</Link>
          <Link href="/sets" className="hover:text-secondary transition">سرویس کامل</Link>
          <Link href="/blog" className="hover:text-secondary transition">مجله</Link>
        </nav>
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 hover:text-secondary transition cursor-pointer" />
          <Link href="/cart" className="hover:text-secondary transition relative">
             <ShoppingBag className="w-5 h-5" />
             <span className="absolute -top-2 -right-2 bg-secondary text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </Link>
          <Link href="/login" className="hover:text-secondary transition">
             <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}