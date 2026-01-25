import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

// ایمپورت‌های کانتکست‌ها
// اگر AuthContext هنوز ندارید، می‌توانید فعلاً خط مربوط به آن را کامنت کنید
import { AuthProvider } from "@/core/contexts/AuthContext"; 
import { CartProvider } from "@/core/contexts/CartContext";

// ایمپورت کامپوننت‌های UI
import { Toaster } from "react-hot-toast";
import CartDrawer from "@/presentation/components/cart/CartDrawer";
import Header from "@/presentation/components/Header";
import Footer from "@/presentation/components/Footer";

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
      <body className={`${vazir.variable} font-sans bg-white text-gray-900 flex flex-col min-h-screen`}>
        
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
                  direction: 'rtl',
                },
              }}
            />
            
            <Header />

            {/* منوی کشویی سبد خرید که در تمام صفحات در دسترس است */}
            {/* فرض بر این است که کد CartDrawer را جداگانه دارید یا بعدا می‌سازید */}
            <CartDrawer />
            
            {/* محتوای اصلی صفحات */}
            <main className="flex-grow">
               {children}
            </main>

            <Footer />
            
          </CartProvider>
          
        </AuthProvider>
      </body>
    </html>
  );
}
