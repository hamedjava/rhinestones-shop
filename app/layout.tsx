import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

// ایمپورت‌های مربوط به سبد خرید و نوتیفیکیشن
import { CartProvider } from "@/core/contexts/CartContext";
import { Toaster } from "react-hot-toast";
import CartDrawer from "@/presentation/components/cart/CartDrawer"; // مطمئن شوید این فایل را طبق مرحله قبل ساخته‌اید

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
        {/* کانتکست سبد خرید باید والد تمام کامپوننت‌ها باشد */}
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
          
          {/* منوی کشویی سبد خرید که همیشه در صفحه هست اما مخفی */}
          <CartDrawer />
          
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
