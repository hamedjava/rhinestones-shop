import { Product } from "./Product";

export interface CartItem extends Product {
  name: string;
  quantity: number;
  // اگر محصول ویژگی‌هایی مثل سایز یا رنگ دارد، اینجا اضافه می‌شود
  // selectedColor?: string;
  // selectedSize?: string;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}
