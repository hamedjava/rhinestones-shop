// src/app/checkout/page.tsx
"use client";

import { useCart } from "@/core/contexts/CartContext";
import { useAuth } from "@/core/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowRight, Truck, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

// تعریف نوع داده‌های فرم
interface CheckoutFormInputs {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  note?: string;
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth(); // دسترسی به یوزر با ساختار جدید
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // تنظیمات فرم
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormInputs>();

  // --- بخش تغییر یافته: پر کردن خودکار فرم از روی مدل User جدید ---
  useEffect(() => {
    if (user) {
      // ترکیب نام و نام خانوادگی برای فیلد FullName
      const fullName = `${user.firstName} ${user.lastName}`;
      setValue("fullName", fullName.trim());

      // اگر کاربر شماره تماس داشت، آن را در فرم قرار بده
      if (user.phoneNumber) {
        setValue("phone", user.phoneNumber);
      }
    }
  }, [user, setValue]);
  // -----------------------------------------------------------

  // اگر سبد خرید خالی بود، کاربر را به صفحه اصلی برگردان
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("سبد خرید شما خالی است");
      router.push("/");
    }
  }, [cartItems, router]);

  // هزینه ارسال
  const SHIPPING_COST = 50000; 
  const FINAL_TOTAL = cartTotal + SHIPPING_COST;

  // تابع نهایی‌سازی خرید
  const onSubmit: SubmitHandler<CheckoutFormInputs> = async (data) => {
    setIsSubmitting(true);

    try {
      // شبیه‌سازی ارسال به سرور
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Order Data:", {
        user_id: user?.id, // ارسال شناسه کاربر واقعی
        shipping_info: data,
        items: cartItems,
        total: FINAL_TOTAL,
      });

      toast.success("سفارش شما با موفقیت ثبت شد!");
      clearCart();
      router.push("/checkout/success");
    } catch (error) {
      toast.error("خطایی در ثبت سفارش رخ داد.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-10" dir="rtl">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-8 text-gray-500 hover:text-gray-800 transition">
          <Link href="/" className="flex items-center gap-2">
             <ArrowRight size={20} />
             <span>بازگشت به فروشگاه</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">تکمیل و پرداخت سفارش</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ستون راست: فرم اطلاعات */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <Truck className="text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-800">اطلاعات ارسال</h2>
              </div>

              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* نام کامل */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                  <input
                    {...register("fullName", { required: "نام الزامی است" })}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.fullName ? "border-red-500" : "border-gray-200"}`}
                    placeholder="مثال: علی محمدی"
                  />
                  {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>}
                </div>

                {/* شماره تماس */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                  <input
                    {...register("phone", { 
                        required: "شماره تماس الزامی است",
                        pattern: { value: /^09[0-9]{9}$/, message: "شماره موبایل نامعتبر است" }
                    })}
                    type="tel"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                    placeholder="مثال: 09123456789"
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                </div>

                {/* استان */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">استان</label>
                  <input
                     {...register("province", { required: "استان الزامی است" })}
                     className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                   {errors.province && <span className="text-red-500 text-xs mt-1">{errors.province.message}</span>}
                </div>

                {/* شهر */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">شهر</label>
                  <input
                     {...register("city", { required: "شهر الزامی است" })}
                     className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                   {errors.city && <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>}
                </div>

                {/* آدرس دقیق */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">آدرس دقیق پستی</label>
                  <textarea
                    {...register("address", { required: "آدرس الزامی است", minLength: { value: 10, message: "آدرس باید دقیق‌تر باشد" } })}
                    rows={3}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.address ? "border-red-500" : "border-gray-200"}`}
                    placeholder="خیابان، کوچه، پلاک، واحد..."
                  ></textarea>
                  {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
                </div>

                {/* کد پستی */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">کد پستی</label>
                  <input
                    {...register("postalCode", { required: "کد پستی الزامی است", minLength: 10 })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </form>
            </div>

            {/* کارت روش پرداخت */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4 border-b pb-4">
                    <CreditCard className="text-indigo-600" />
                    <h2 className="text-xl font-bold text-gray-800">روش پرداخت</h2>
                </div>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-indigo-50 transition bg-indigo-50 border-indigo-200">
                        <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-indigo-600" />
                        <span className="font-medium text-gray-800">پرداخت اینترنتی (درگاه بانکی)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition opacity-60">
                        <input type="radio" name="payment" disabled className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-500">پرداخت در محل (فعلاً غیرفعال)</span>
                    </label>
                </div>
            </div>
          </div>

          {/* ستون چپ: خلاصه سفارش */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">خلاصه سفارش</h2>
              
              <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2 scrollbar-thin">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                             <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-700 line-clamp-1">{item.title}</h4>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">{item.quantity} عدد</span>
                                <span className="text-xs font-semibold text-gray-800">{Number(item.price).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                    <span>قیمت کالاها ({cartItems.length})</span>
                    <span>{cartTotal.toLocaleString()} تومان</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>هزینه ارسال</span>
                    <span>{SHIPPING_COST.toLocaleString()} تومان</span>
                </div>
                <div className="flex justify-between text-indigo-600 font-bold text-lg pt-4 border-t mt-2">
                    <span>مبلغ قابل پرداخت</span>
                    <span>{FINAL_TOTAL.toLocaleString()} تومان</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>در حال پردازش...</span>
                    </>
                ) : (
                    <>
                        <ShieldCheck size={20} />
                        <span>پرداخت و ثبت نهایی</span>
                    </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                 <ShieldCheck size={14} />
                 <span>تضمین امنیت پرداخت شما</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
