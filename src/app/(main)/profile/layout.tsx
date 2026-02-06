import Link from "next/link";
import { User, ShoppingBag, MapPin, LogOut, LayoutDashboard, Settings } from "lucide-react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-[#0f393b] text-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              
              {/* User Info Summary */}
              <div className="p-6 border-b border-white/10 text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-[#d4af37]">
                  U
                </div>
                <h2 className="font-bold text-lg">کاربر گرامی</h2>
                <p className="text-sm text-gray-300">09123456789</p>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-2">
                <SidebarLink href="/profile" icon={<LayoutDashboard size={20} />} label="داشبورد" />
                <SidebarLink href="/profile/orders" icon={<ShoppingBag size={20} />} label="سفارش‌های من" />
                {/* لینک‌های زیر فعلا نمایشی هستند تا بعدا صفحه بسازیم */}
                <SidebarLink href="/profile" icon={<MapPin size={20} />} label="آدرس‌ها" />
                <SidebarLink href="/profile" icon={<Settings size={20} />} label="جزئیات حساب" />
                
                <button className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-400 hover:bg-white/5 rounded-xl transition-colors text-right">
                  <LogOut size={20} />
                  <span>خروج از حساب</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-h-[500px]">
            {children}
          </main>
          
        </div>
      </div>
    </div>
  );
}

// کامپوننت کمکی برای لینک‌ها با استایل اکتیو و هاور
function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-200 hover:bg-white/10 hover:text-[#d4af37] transition-all duration-200"
    >
      <span className="text-[#d4af37] opacity-80">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
