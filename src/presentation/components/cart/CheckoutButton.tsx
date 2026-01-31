"use client";

import { useState } from "react";
import { useCart } from "@/core/contexts/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // استفاده از navigation برای نسخه جدید Next.js

// تعریف تایپ برای پاسخ API جهت جلوگیری از خطای TypeScript
interface PaymentResponse {
  url?: string;
  error?: string;
}

export default function CheckoutButton() {
  const { cartTotal, cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    // ۱. بررسی خالی نبودن سبد خرید
    if (!cartItems || cartItems.length === 0) {
      toast.error("سبد خرید شما خالی است!");
      return;
    }

    setLoading(true);

    try {
      // ۲. ارسال درخواست به API
      // نکته: ما اینجا اطلاعات "مهمان" را ارسال می‌کنیم چون دکمه پرداخت سریع است
      const response = await fetch("/api/payment/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          description: `پرداخت سفارش شامل ${cartItems.length} محصول`,
          user: {
            mobile: "09120000000", // شماره پیش‌فرض برای تست (در حالت واقعی باید از اینپوت بگیرید)
            email: "guest@example.com",
            name: "کاربر مهمان",
          },
        }),
      });

      const data: PaymentResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "خطا در برقراری ارتباط با سرور");
      }

      // ۳. هدایت به درگاه بانک
      if (data.url) {
        toast.loading("در حال انتقال به درگاه پرداخت...");
        window.location.href = data.url;
      } else {
        toast.error("لینک پرداخت دریافت نشد.");
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.message || "مشکلی در اتصال به درگاه پیش آمد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || cartItems.length === 0}
      className={`
        w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2
        ${loading || cartItems.length === 0 
          ? "bg-gray-400 cursor-not-allowed opacity-70" 
          : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
        }
      `}
    >
      {loading ? (
        <>
          {/* لودر ساده SVG بدون نیاز به کتابخانه اضافی */}
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>در حال پردازش...</span>
        </>
      ) : (
        <>
          {/* آیکون کارت بانکی SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
          <span>پرداخت نهایی: {Number(cartTotal).toLocaleString()} تومان</span>
        </>
      )}
    </button>
  );
}
