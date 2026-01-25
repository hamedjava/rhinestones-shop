// src/domain/models/Product.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    // آرایه‌ای از آدرس تصاویر (رشته)
    images: string[]; 
    category: string;
    // برای نشان دادن محصولات خاص در صفحه اصلی یا بالای لیست
    isFeatured: boolean; 
  }
  