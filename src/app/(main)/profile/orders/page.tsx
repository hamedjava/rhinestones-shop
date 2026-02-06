import Link from "next/link";
import { Package, Calendar, Clock, ChevronLeft, ShoppingBag } from "lucide-react";

// داده‌های نمونه (بعداً از دیتابیس خوانده می‌شود)
const orders = [
  {
    id: "ORD-8591",
    date: "1402/11/17",
    total: "15,500,000",
    status: "processing",
    statusText: "در حال پردازش",
    itemCount: 3,
  },
  {
    id: "ORD-1204",
    date: "1402/10/02",
    total: "8,200,000",
    status: "delivered",
    statusText: "تحویل شده",
    itemCount: 1,
  },
  {
    id: "ORD-0992",
    date: "1402/09/20",
    total: "22,000,000",
    status: "cancelled",
    statusText: "لغو شده",
    itemCount: 2,
  },
];

export default function OrdersPage() {
  return (
    <div className="w-full">
      {/* تیتر صفحه */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
        <div className="w-10 h-10 rounded-full bg-[#0f393b]/10 flex items-center justify-center text-[#0f393b]">
          <ShoppingBag size={20} />
        </div>
        <h1 className="text-2xl font-bold text-[#0f393b]">تاریخچه سفارشات</h1>
      </div>

      {/* لیست سفارشات */}
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            // !bg-white استفاده شده تا حتما پس‌زمینه سفید باشد
            className="!bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* هدر کارت - اطلاعات کلی */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-[#d4af37]" />
                  <span>کد سفارش:</span>
                  <span className="font-mono font-bold text-gray-900">{order.id}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#d4af37]" />
                  <span>{order.date}</span>
                </div>

              </div>

              {/* وضعیت سفارش */}
              <StatusBadge status={order.status} text={order.statusText} />
            </div>

            {/* بدنه کارت - مبلغ و دکمه */}
            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* تصاویر دمو محصولات */}
                <div className="flex -space-x-3 space-x-reverse">
                  {[...Array(order.itemCount)].map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 overflow-hidden">
                       {/* اینجا جای عکس است */}
                       <img src="/placeholder.png" alt="" className="w-full h-full object-cover opacity-50" />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  {order.itemCount} محصول
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">مبلغ کل پرداخت</p>
                  <p className="text-lg font-bold text-[#0f393b]">{order.total} <span className="text-xs font-normal">تومان</span></p>
                </div>

                <Link
                  href={`/profile/orders/${order.id}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#0f393b] text-[#0f393b] hover:bg-[#0f393b] hover:text-white transition-colors text-sm font-medium"
                >
                  مشاهده فاکتور
                  <ChevronLeft size={16} />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// کامپوننت وضعیت (Badge)
function StatusBadge({ status, text }: { status: string; text: string }) {
  const styles: Record<string, string> = {
    processing: "bg-amber-50 text-amber-700 border-amber-200",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.processing} flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'processing' ? 'bg-amber-500 animate-pulse' : status === 'delivered' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
      {text}
    </span>
  );
}
