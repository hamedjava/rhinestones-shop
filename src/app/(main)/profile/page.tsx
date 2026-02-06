import Link from "next/link";
import { ShoppingBag, Clock, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f393b] mb-2">خوش آمدید، کاربر عزیز</h1>
          <p className="text-gray-500">از اینجا می‌توانید حساب کاربری و سفارشات خود را مدیریت کنید.</p>
        </div>
        <Link 
          href="/" 
          className="bg-[#d4af37] hover:bg-[#b8962e] text-white px-6 py-3 rounded-xl transition-colors font-medium shadow-md shadow-[#d4af37]/20"
        >
          بازگشت به فروشگاه
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          label="سفارش‌های جاری" 
          value="۱" 
          icon={<Clock size={24} />} 
          color="bg-amber-50 text-amber-600" 
        />
        <StatCard 
          label="تحویل شده" 
          value="۱۲" 
          icon={<CheckCircle size={24} />} 
          color="bg-emerald-50 text-emerald-600" 
        />
        <StatCard 
          label="کل سفارش‌ها" 
          value="۱۳" 
          icon={<ShoppingBag size={24} />} 
          color="bg-blue-50 text-blue-600" 
        />
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">آخرین سفارش‌ها</h2>
          <Link href="/profile/orders" className="text-sm text-[#d4af37] hover:underline">
            مشاهده همه
          </Link>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-sm text-center py-8">
            در حال بارگذاری لیست سفارشات...
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
