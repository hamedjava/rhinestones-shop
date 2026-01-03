import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

// ایمپورت‌های کانتکست‌ها
import { AuthProvider } from "@/core/contexts/AuthContext"; 
import { CartProvider } from "@/core/contexts/CartContext";

// ایمپورت کامپوننت‌های UI
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
      <body className={`${vazir.variable} font-sans bg-white text-gray-900`}>
        
        {/* AuthProvider بالاترین لایه است */}
        <AuthProvider>
          
          {/* CartProvider برای مدیریت سبد خرید */}
          <CartProvider>
            
            {/* کامپوننت نمایش پیام‌های Toast */}
            <Toaster 
              position="top-center" 
              toastOptions={{
                style: {
                  fontFamily: 'var(--font-vazir)',
                  fontSize: '14px',
                  direction: 'rtl', // برای نمایش صحیح فارسی
                },
              }}
            />
            
            {/* منوی کشویی سبد خرید که در تمام صفحات در دسترس است */}
            <CartDrawer />
            
            {/* محتوای اصلی صفحات */}
            {children}
            
          </CartProvider>
          
        </AuthProvider>
      </body>
    </html>
  );
}
