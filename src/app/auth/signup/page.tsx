// app/auth/signup/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/core/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
// 1. ایمپورت مدل یوزر
import { User } from '@/core/entities/User';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // شبیه‌سازی ثبت نام
    
    // 2. استفاده از تایپ User برای اطمینان از ساختار صحیح
    const newUser: User = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      // phoneNumber اختیاری است، پس اگر نباشد هم ارور نمی‌دهد
      role: 'customer',
    };

    // لاگین خودکار بعد از ثبت نام
    login(newUser, 'fake-jwt-token');
    
    toast.success('ثبت نام با موفقیت انجام شد');
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 font-vazir">
            ایجاد حساب کاربری
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            قبلاً ثبت نام کرده‌اید؟{' '}
            <Link href="/auth/login" className="font-medium text-emerald-600 hover:text-emerald-500">
              وارد شوید
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام</label>
              <input name="firstName" required onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام خانوادگی</label>
              <input name="lastName" required onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input name="email" type="email" required onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
            <input name="password" type="password" required onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
          </div>

          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            ثبت نام
          </button>
        </form>
      </div>
    </div>
  );
}
