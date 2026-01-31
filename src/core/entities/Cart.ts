// src/core/entities/Cart.ts
import { Product } from "@/domain/models/Product"; 

export interface CartItem extends Product {
  // ویژگی name و images و id از Product به ارث برده می‌شوند.
  
  title: string; // اجباری برای نمایش نام محصول
  quantity: number; // تعداد در سبد خرید
  
  // *** این خط را اضافه کنید تا ارور برطرف شود ***
  // این ویژگی اختیاری است تا اگر در کانتکست آن را ست کردید، تایپ‌اسکریپت ایراد نگیرد
  image?: string; 
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}
