// src/app/payment/callback/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/core/contexts/CartContext"; // مسیر کانتکست شما درست است
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [refId, setRefId] = useState<string>("");
  const isVerifying = useRef(false);

  useEffect(() => {
    const authority = searchParams.get("Authority");
    const paymentStatus = searchParams.get("Status");

    if (isVerifying.current) return;
    isVerifying.current = true;

    if (paymentStatus !== "OK") {
      setStatus("failed");
      return;
    }

    // شبیه‌سازی تایید تراکنش (چون API Verify سمت سرور را هنوز نساختیم)
    // در حالت واقعی اینجا باید به یک API دیگر درخواست بزنید
    setTimeout(() => {
       // فرض موفقیت در محیط تست
       setStatus("success");
       setRefId(authority || "DEMO-REF-ID"); 
       clearCart(); 
    }, 1500);

  }, [searchParams, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
        
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-gray-700">در حال تایید پرداخت...</h2>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">پرداخت موفق!</h2>
            <p className="text-gray-600 mt-2">سفارش شما ثبت شد.</p>
            <div className="bg-gray-100 p-3 rounded mt-4 w-full">
               <span className="text-xs text-gray-500">کد پیگیری:</span>
               <div className="text-lg font-mono font-bold">{refId}</div>
            </div>
            <Link href="/shop" className="mt-6 w-full bg-black text-white py-3 rounded-xl block hover:bg-gray-800 transition">
              بازگشت به فروشگاه
            </Link>
          </div>
        )}

        {status === "failed" && (
          <div className="flex flex-col items-center">
            <XCircle className="w-20 h-20 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">پرداخت ناموفق</h2>
            <div className="flex gap-4 w-full mt-6">
                 <Link href="/checkout" className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition">
                  تلاش مجدد
                </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
