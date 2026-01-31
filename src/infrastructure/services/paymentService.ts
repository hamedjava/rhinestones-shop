// src/infrastructure/services/paymentService.ts

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;
const IS_SANDBOX = process.env.PAYMENT_SANDBOX === "true";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// آدرس‌های زرین‌پال (V4)
const ZARINPAL_URLS = {
  REQUEST: IS_SANDBOX
    ? "https://sandbox.zarinpal.com/pg/v4/payment/request.json"
    : "https://api.zarinpal.com/pg/v4/payment/request.json",
  VERIFY: IS_SANDBOX
    ? "https://sandbox.zarinpal.com/pg/v4/payment/verify.json"
    : "https://api.zarinpal.com/pg/v4/payment/verify.json",
  START_GATEWAY: IS_SANDBOX
    ? "https://sandbox.zarinpal.com/pg/StartPay/"
    : "https://www.zarinpal.com/pg/StartPay/",
};

interface PaymentRequestParams {
  amount: number; // مبلغ به تومان
  description: string;
  userEmail?: string;
  userMobile?: string;
  callbackUrl: string;
}

interface PaymentResult {
  url: string;
  authority: string;
}

interface VerifyResult {
  success: boolean;
  refId?: string;
  code?: number;
}

export const paymentService = {
  async requestPayment({ amount, description, userMobile, userEmail, callbackUrl }: PaymentRequestParams): Promise<PaymentResult> {
    if (!MERCHANT_ID) throw new Error("Merchant ID is missing in env vars");

    // زرین‌پال مبلغ را به ریال می‌گیرد
    const amountInRials = amount * 10;

    const payload = {
      merchant_id: MERCHANT_ID,
      amount: amountInRials,
      callback_url: `${BASE_URL}${callbackUrl}`,
      description: description,
      metadata: {
        email: userEmail || "",
        mobile: userMobile || "",
      },
    };

    console.log("🔵 Sending Payment Request to ZarinPal:", { 
      url: ZARINPAL_URLS.REQUEST, 
      merchantIdPresent: !!MERCHANT_ID,
      isSandbox: IS_SANDBOX 
    });

    try {
      const response = await fetch(ZARINPAL_URLS.REQUEST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store", // <--- بسیار مهم برای Next.js (جلوگیری از کش)
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("🟢 ZarinPal Response:", JSON.stringify(data, null, 2));

      // مدیریت خطاهای زرین‌پال (ساختار جدید و قدیم)
      const errors = data.errors;
      if (errors && Object.keys(errors).length > 0) {
        const errorMsg = JSON.stringify(errors);
        throw new Error(`ZarinPal API Error: ${errorMsg}`);
      }

      // استخراج داده‌ها با پشتیبانی از ساختارهای مختلف پاسخ
      const responseData = data.data || data;
      const authority = responseData.authority;
      const code = responseData.code;

      if (code === 100 && authority) {
        return {
          url: `${ZARINPAL_URLS.START_GATEWAY}${authority}`,
          authority: authority,
        };
      } else {
        throw new Error(`Payment Request Logic Failed. Code: ${code}`);
      }
    } catch (error: any) {
      console.error("🔴 Payment Service Error Details:", {
        message: error.message,
        cause: error.cause, // برای دیدن خطای اصلی شبکه (مثل ConnectTimeout)
        stack: error.stack
      });
      throw error;
    }
  },

  async verifyPayment(authority: string, amount: number): Promise<VerifyResult> {
     if (!MERCHANT_ID) throw new Error("Merchant ID is missing");
     
     const amountInRials = amount * 10;

     const payload = {
       merchant_id: MERCHANT_ID,
       amount: amountInRials,
       authority: authority,
     };

     try {
       const response = await fetch(ZARINPAL_URLS.VERIFY, {
         method: "POST",
         headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json" 
         },
         body: JSON.stringify(payload),
         cache: "no-store", // <--- جلوگیری از کش
       });

       if (!response.ok) {
        console.error("Verify HTTP Error:", response.status);
        return { success: false };
       }

       const data = await response.json();
       const responseData = data.data || data;
       
       const code = responseData.code;
       const refId = responseData.ref_id;

       // کدهای 100 (موفق) و 101 (قبلاً وریفای شده)
       if (code === 100 || code === 101) {
         return { success: true, refId: refId, code: code };
       } else {
         console.warn("Verify Failed Logic:", responseData);
         return { success: false, code: code };
       }
     } catch (error) {
       console.error("Verify Network/System Error:", error);
       return { success: false };
     }
  }
};
