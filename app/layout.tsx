import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

// --- ایمپورت‌های کانتکست‌ها ---
// 1. اضافه کردن AuthProvider (طبق ارور شما در پوشه contexts قرار دارد)
import { AuthProvider } from "@/core/contexts/AuthContext"; 
import { CartProvider } from "@/core/contexts/CartContext";

import { Toaster } from "react-hot-toast";
import CartDrawer from "@/presentation/components/cart/CartDrawer";

const vazir = Vazirmatn({ 
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "جواهرات لوکس زمرد",
  description: "فروشگاه اینترنتی جواهرات و زیورآلات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable} font-sans bg-surface text-text-main`}>
        
        {/* 2. AuthProvider باید بالاترین لایه باشد تا اطلاعات کاربر در دسترس همه باشد */}
        <AuthProvider>
          
          {/* کانتکست سبد خرید */}
          <CartProvider>
            
            {/* کامپوننت نمایش پیام‌های موفقیت/خطا */}
            <Toaster 
              position="top-center" 
              toastOptions={{
                style: {
                  fontFamily: 'var(--font-vazir)',
                  fontSize: '14px',
                },
              }}
            />
            
            {/* منوی کشویی سبد خرید */}
            <CartDrawer />
            
            {/* محتوای صفحات */}
            {children}
            
          </CartProvider>
          
        </AuthProvider>
      </body>
    </html>
  );
}
