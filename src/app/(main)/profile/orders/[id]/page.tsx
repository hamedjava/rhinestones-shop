import Link from "next/link";
import { ChevronRight, Printer, MapPin, CreditCard, Package } from "lucide-react";

// داده‌های ساختگی برای نمایش (بعداً از دیتابیس خوانده می‌شود)
const mockOrderDetails = {
  id: "ORD-8591",
  date: "1402/11/17",
  status: "processing",
  statusText: "در حال پردازش",
  items: [
    { id: 1, name: "تی‌شرت ورزشی نایک مدل Pro", price: "2,500,000", quantity: 2, total: "5,000,000" },
    { id: 2, name: "شلوار اسلش مردانه", price: "10,500,000", quantity: 1, total: "10,500,000" },
  ],
  subtotal: "15,500,000",
  shipping: "رایگان",
  total: "15,500,000",
  address: "تهران، خیابان ولیعصر، بالاتر از میدان ونک، کوچه نگار، پلاک ۳، واحد ۴",
  paymentMethod: "پرداخت اینترنتی (زرین‌پال)",
};

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  // در آینده با استفاده از params.id اطلاعات واقعی را فچ می‌کنیم

  return (
    <div className="w-full space-y-6">
      
      {/* دکمه بازگشت و تیتر */}
      <div className="flex items-center justify-between">
        <Link 
          href="/profile/orders"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#0f393b] transition-colors"
        >
          <ChevronRight size={16} />
          بازگشت به لیست سفارش‌ها
        </Link>
        
        {/* دکمه پرینت نمایشی */}
        <button className="flex items-center gap-2 text-[#d4af37] text-sm hover:underline">
          <Printer size={16} />
          چاپ فاکتور
        </button>
      </div>

      {/* کارت اصلی فاکتور */}
      <div className="!bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        
        {/* سربرگ فاکتور */}
        <div className="bg-gray-50 border-b border-gray-200 p-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#0f393b] flex items-center gap-2">
              <Package className="text-[#d4af37]" />
              جزئیات سفارش <span className="font-mono text-gray-600">#{mockOrderDetails.id}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">تاریخ ثبت: {mockOrderDetails.date}</p>
          </div>
          
          <div className="bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            {mockOrderDetails.statusText}
          </div>
        </div>

        {/* محتوای فاکتور */}
        <div className="p-6">
          
          {/* جدول محصولات */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 font-medium">محصول</th>
                  <th className="py-3 px-4 font-medium">قیمت واحد</th>
                  <th className="py-3 px-4 font-medium text-center">تعداد</th>
                  <th className="py-3 px-4 font-medium text-left">قیمت کل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockOrderDetails.items.map((item) => (
                  <tr key={item.id} className="text-gray-700 hover:bg-gray-50/50">
                    <td className="py-4 px-4 font-medium">{item.name}</td>
                    <td className="py-4 px-4">{item.price} تومان</td>
                    <td className="py-4 px-4 text-center">{item.quantity}</td>
                    <td className="py-4 px-4 text-left font-bold">{item.total} تومان</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
            
            {/* اطلاعات ارسال و پرداخت */}
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="mt-1 bg-gray-100 p-2 rounded-full h-fit">
                    <MapPin size={18} className="text-gray-600" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 mb-1">آدرس تحویل</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{mockOrderDetails.address}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 bg-gray-100 p-2 rounded-full h-fit">
                    <CreditCard size={18} className="text-gray-600" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 mb-1">روش پرداخت</h3>
                    <p className="text-sm text-gray-600">{mockOrderDetails.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* خلاصه هزینه‌ها */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3 h-fit">
              <div className="flex justify-between text-gray-600">
                <span>جمع کل اقلام</span>
                <span>{mockOrderDetails.subtotal} تومان</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>هزینه ارسال</span>
                <span className="text-emerald-600">{mockOrderDetails.shipping}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                <span className="font-bold text-[#0f393b]">مبلغ نهایی</span>
                <span className="font-bold text-xl text-[#0f393b]">{mockOrderDetails.total} تومان</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
