"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100 animate-scale-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">سفارش با موفقیت ثبت شد!</h1>
        <p className="text-gray-500 mb-8">
          از خرید شما متشکریم. سفارش شما پردازش شده و به زودی ارسال خواهد شد.
        </p>

        <div className="space-y-3">
            <Link 
                href="/profile/orders" 
                className="block w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
                پیگیری سفارش
            </Link>
            <Link 
                href="/" 
                className="block w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
            >
                بازگشت به صفحه اصلی
            </Link>
        </div>
      </div>
    </div>
  );
}
