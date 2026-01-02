// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/core/contexts/AuthContext';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
// 1. ایمپورت مدل یوزر
import { User } from '@/core/entities/User';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const redirectPath = searchParams.get('redirect') || '/profile';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (email && password) {
        // 2. استفاده از تایپ User برای اطمینان از ساختار صحیح
        const mockUser: User = {
          id: '1',
          firstName: 'کاربر',
          lastName: 'تستی',
          email: email,
          phoneNumber: '09123456789', // اختیاری است اما برای تست سبد خرید مفید است
          role: 'customer',
        };

        login(mockUser, 'fake-jwt-token');
        
        toast.success('ورود با موفقیت انجام شد');
        router.push(redirectPath);
      } else {
        toast.error('لطفا ایمیل و رمز عبور را وارد کنید');
      }
    } catch (error) {
      toast.error('خطا در ورود به حساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 font-vazir">
            ورود به حساب کاربری
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            یا{' '}
            <Link href="/auth/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
              حساب کاربری جدید بسازید
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                ایمیل
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="info@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400"
            >
              {loading ? 'در حال ورود...' : 'ورود'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
