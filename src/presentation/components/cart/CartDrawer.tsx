"use client";

import { useCart } from "@/core/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import CheckoutButton from "./CheckoutButton"; // <--- ایمپورت دکمه جدید

// Icons
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, addToCart, decreaseQuantity, cartTotal } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isCartOpen) {
        toggleCart();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen, toggleCart]);
 
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        ref={drawerRef}
        dir="rtl"
        className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold text-gray-800">سبد خرید ({cartItems.length})</h2>
            <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                <p>سبد خرید شما خالی است.</p>
                <button 
                    onClick={toggleCart}
                    className="text-indigo-600 font-medium hover:underline"
                >
                    مشاهده محصولات
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                // *** منطق انتخاب تصویر ***
                const itemAny = item as any;
                const imageSrc = itemAny.image || (itemAny.images && itemAny.images.length > 0 ? itemAny.images[0] : null);
                
                return (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border flex items-center justify-center">
                      {imageSrc ? (
                          <Image
                          src={imageSrc} 
                          alt={item.title || "Product"}
                          fill
                          className="object-cover"
                          />
                      ) : (
                          <span className="text-xs text-gray-400">بدون تصویر</span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{Number(item.price).toLocaleString()} تومان</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-white border rounded-lg px-2 py-1">
                              <button 
                                  onClick={() => decreaseQuantity(Number(item.id))}
                                  className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-indigo-600"
                              >
                                  -
                              </button>
                              <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                              <button 
                                  onClick={() => addToCart(item)}
                                  className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-indigo-600"
                              >
                                  +
                              </button>
                          </div>
                          <button 
                              onClick={() => removeFromCart(Number(item.id))}
                              className="text-red-500 hover:text-red-600 p-1"
                          >
                              <TrashIcon />
                          </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* قسمت پایین دراور */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t bg-white space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">جمع کل کالاها:</span>
                <span className="text-lg font-bold text-indigo-900">{cartTotal.toLocaleString()} تومان</span>
              </div>
              
              {/* استفاده از کامپوننت CheckoutButton که اضافه شد */}
              <CheckoutButton />

              {/* لینک جایگزین برای رفتن به صفحه ثبت آدرس (اختیاری) */}
              <div className="text-center">
                <Link 
                    href="/checkout" 
                    onClick={toggleCart}
                    className="text-xs text-gray-500 hover:text-indigo-600 underline"
                >
                    تکمیل اطلاعات و ثبت آدرس دقیق
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
