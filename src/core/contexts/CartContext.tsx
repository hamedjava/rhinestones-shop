"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/core/entities/Cart";
import { Product } from "@/core/entities/Product";
import toast from "react-hot-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product | CartItem) => void;
  removeFromCart: (productId: number | string) => void;
  decreaseQuantity: (productId: number | string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // لود کردن اولیه
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("shopping-cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error parsing cart", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // ذخیره تغییرات
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // --- اصلاح شده: Toast خارج از setState ---
  const addToCart = (product: Product | CartItem) => {
    const targetId = Number(product.id);
    
    // ابتدا چک می‌کنیم آیا محصول وجود دارد یا خیر (بدون تغییر استیت)
    const existingItemIndex = cartItems.findIndex((item) => Number(item.id) === targetId);

    if (existingItemIndex > -1) {
      // سناریوی ۱: محصول قبلاً هست -> افزایش تعداد
      toast.success("تعداد محصول افزایش یافت");
      
      setCartItems((prev) => {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      });
    } else {
      // سناریوی ۲: محصول جدید -> افزودن به لیست
      toast.success("به سبد خرید اضافه شد");
      
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: Number(product.price),
        image: product.image,
        quantity: 1,
      } as unknown as CartItem;

      setCartItems((prev) => [...prev, newItem]);
    }
    
    setIsCartOpen(true);
  };

  const decreaseQuantity = (productId: number | string) => {
    const targetId = Number(productId);
    const existingItem = cartItems.find((item) => Number(item.id) === targetId);

    if (existingItem?.quantity === 1) {
       // اگر ۱ بود و کم شد -> حذف و نمایش پیام
       toast.error("محصول حذف شد");
       setCartItems((prev) => prev.filter((item) => Number(item.id) !== targetId));
    } else {
       // کاهش معمولی
       setCartItems((prev) =>
        prev.map((item) =>
          Number(item.id) === targetId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId: number | string) => {
    toast.error("محصول از سبد خرید حذف شد");
    const targetId = Number(productId);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== targetId));
  };

  const clearCart = () => {
    toast.success("سبد خرید خالی شد");
    setCartItems([]);
    localStorage.removeItem("shopping-cart");
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // جلوگیری از باگ هیدراتاسیون
  if (!isLoaded) return null;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        isCartOpen,
        toggleCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
