// src/app/api/payment/request/route.ts

import { NextResponse } from "next/server";
import { paymentService } from "@/infrastructure/services/paymentService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // لاگ کردن بادی دریافتی برای دیباگ
    console.log("API received body:", body);

    // دریافت اطلاعات با نام صحیح (مطابق با چیزی که از CheckoutButton می‌آید)
    const { amount, user, description } = body; 

    if (!amount) {
      return NextResponse.json({ error: "مبلغ نامعتبر است" }, { status: 400 });
    }

    // بررسی وجود مرچنت آی‌دی
    if (!process.env.ZARINPAL_MERCHANT_ID) {
      console.error("ZARINPAL_MERCHANT_ID is missing in .env.local");
      return NextResponse.json({ error: "تنظیمات درگاه در سرور انجام نشده است" }, { status: 500 });
    }

    const result = await paymentService.requestPayment({
      amount: Number(amount),
      description: description || `پرداخت سفارش کاربر`,
      userMobile: user?.mobile, // استفاده از user که از فرانت آمده
      userEmail: user?.email,
      callbackUrl: "/payment/callback", // حتما باید با / شروع شود
    });

    return NextResponse.json({ url: result.url });

  } catch (error: any) {
    console.error("API Route Error Detailed:", error);
    
    return NextResponse.json(
      { error: error.message || "خطا در ارتباط با درگاه پرداخت" }, 
      { status: 500 }
    );
  }
}
