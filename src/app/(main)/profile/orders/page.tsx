import Image from "next/image";
import Link from "next/link";

// دیتای ساختگی برای تست UI (بعدا با API جایگزین میشه)
const mockOrders = [
  {
    id: "ORD-123456",
    date: "۱۴۰۲/۱۱/۱۰",
    status: "processing", // pending, processing, delivered, cancelled
    totalPrice: 15500000,
    items: [
      { id: 1, title: "کفش ورزشی نایک مدل Air", image: "/images/product-1.jpg" }, // مسیر عکس تستی
      { id: 2, title: "تی‌شرت ورزشی مردانه", image: "/images/product-2.jpg" },
    ]
  },
  {
    id: "ORD-987654",
    date: "۱۴۰۲/۱۰/۰۵",
    status: "delivered",
    totalPrice: 2400000,
    items: [
      { id: 3, title: "شلوار اسلش کتان", image: "/images/product-3.jpg" },
    ]
  },
  {
    id: "ORD-456789",
    date: "۱۴۰۲/۰۹/۲۰",
    status: "cancelled",
    totalPrice: 890000,
    items: [
        { id: 4, title: "جوراب نانو بسته ۳ تایی", image: "" }, // تست بدون عکس
    ]
  }
];

// کامپوننت کمکی برای وضعیت سفارش
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "در انتظار پرداخت" },
    processing: { bg: "bg-blue-100", text: "text-blue-700", label: "در حال پردازش" },
    delivered: { bg: "bg-green-100", text: "text-green-700", label: "تحویل شده" },
    cancelled: { bg: "bg-red-100", text: "text-red-700", label: "لغو شده" },
  };
  
  const current = styles[status as keyof typeof styles] || styles.pending;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${current.bg} ${current.text}`}>
      {current.label}
    </span>
  );
};

// کامپوننت برای هندل کردن عکس‌های احتمالا خراب
const OrderImage = ({ src, alt }: { src?: string, alt: string }) => {
    if (!src) {
        return <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Img</div>
    }
    // اینجا از تگ img معمولی استفاده کردم برای تست، توی پروژه واقعی Image نکست جی‌اس باشه
    return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">سفارش‌های من</h1>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* هدر کارت سفارش */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4 mb-4">
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1">شماره سفارش</span>
                  <span className="font-mono font-medium">{order.id}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">تاریخ ثبت</span>
                  <span className="font-medium">{order.date}</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-gray-500 block mb-1">مبلغ کل</span>
                  <span className="font-medium">{order.totalPrice.toLocaleString()} تومان</span>
                </div>
              </div>
              
              <StatusBadge status={order.status} />
            </div>

            {/* لیست آیتم‌های داخل سفارش */}
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3 space-x-reverse">
                {order.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="relative w-14 h-14 rounded-full border-2 border-white dark:border-zinc-900 overflow-hidden bg-gray-100"
                    title={item.title}
                  >
                   <OrderImage src={item.image} alt={item.title} />
                  </div>
                ))}
                {order.items.length > 4 && (
                    <div className="relative w-14 h-14 rounded-full border-2 border-white dark:border-zinc-900 overflow-hidden bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                        +2
                    </div>
                )}
              </div>

              <Link 
                href={`/profile/orders/${order.id}`} 
                className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
              >
                مشاهده فاکتور
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </Link>
            </div>
            
            {/* نمایش قیمت در موبایل که بالا مخفی شده بود */}
            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-zinc-800 sm:hidden flex justify-between items-center">
                <span className="text-sm text-gray-500">مبلغ کل:</span>
                <span className="font-bold">{order.totalPrice.toLocaleString()} تومان</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
