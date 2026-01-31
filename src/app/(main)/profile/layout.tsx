import Link from "next/link";
import { ReactNode } from "react";

// دیتای منوی سایدبار
const sidebarItems = [
  { 
    name: "داشبورد", 
    href: "/profile", 
    icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> 
  },
  { 
    name: "سفارش‌های من", 
    href: "/profile/orders", 
    icon: <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0"></path> 
  },
  { 
    name: "آدرس‌ها", 
    href: "/profile/addresses", 
    icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path> 
  },
  { 
    name: "جزئیات حساب", 
    href: "/profile/details", 
    icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8"></path> 
  },
];

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* سایدبار (منوی سمت راست) */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
            
            {/* هدر سایدبار - اطلاعات خلاصه کاربر */}
            <div className="p-6 bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800 text-center">
              <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                U
              </div>
              <h2 className="font-bold text-gray-900 dark:text-white">کاربر عزیز</h2>
              <p className="text-sm text-gray-500 mt-1">09123456789</p>
            </div>

            {/* لینک‌های منو */}
            <nav className="p-4 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-blue-600 transition-colors group"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="group-hover:stroke-blue-600"
                  >
                    {item.icon}
                  </svg>
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              ))}
              
              {/* دکمه خروج */}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span className="font-medium text-sm">خروج از حساب</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* محتوای اصلی هر صفحه */}
        <main className="flex-1 min-h-[500px]">
          {children}
        </main>

      </div>
    </div>
  );
}
