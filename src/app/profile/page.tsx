// src/app/profile/page.tsx
'use client';

import { useAuth } from '@/core/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  // مطمئن شوید isLoading در AuthContext برگردانده می‌شود
  const { user, logout, isLoading } = useAuth(); 
  const router = useRouter();

  // محافظت از صفحه: اگر لودینگ تمام شده بود و کاربری نبود، برو به لاگین
  useEffect(() => {
    if (!isLoading && !user) {
      // مسیر درست: /auth/login
      router.push('/auth/login?redirect=/profile');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-emerald-600 animate-pulse">در حال بررسی وضعیت احراز هویت...</div>
      </div>
    );
  }

  // جلوگیری از پرش صفحه (Flash of Content) قبل از ریدایرکت
  if (!user) return null; 

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        
        {/* هدر پروفایل */}
        <div className="bg-emerald-600 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white uppercase border-2 border-white/30">
              {/* اگر نام وجود داشت حرف اول، وگرنه U */}
              {user.firstName ? user.firstName[0] : 'U'}
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold font-vazir">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-emerald-100 dir-ltr text-right text-sm mt-1 opacity-90">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* محتوای پروفایل */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* کارت اطلاعات */}
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-200 pb-2 text-gray-700">
                اطلاعات حساب
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600 flex justify-between">
                  <span className="font-medium text-gray-800">شماره تماس:</span> 
                  <span>{user.phoneNumber || '---'}</span>
                </p>
                <p className="text-gray-600 flex justify-between">
                  <span className="font-medium text-gray-800">نقش کاربری:</span> 
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {user.role === 'admin' ? 'مدیر سیستم' : 'مشتری'}
                  </span>
                </p>
              </div>
            </div>
            
            {/* کارت سفارش‌ها */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-200 pb-2 text-gray-700">
                سفارش‌های اخیر
              </h3>
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-sm italic">هنوز سفارشی ثبت نکرده‌اید.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => {
                logout();
                router.push('/auth/login'); // بعد از خروج هم به لاگین برود
              }}
              className="flex items-center gap-2 px-5 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              خروج از حساب کاربری
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
