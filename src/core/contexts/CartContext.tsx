"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
// فرض بر این است که این مدل‌ها در این مسیرها وجود دارند
import { CartItem } from "@/core/entities/Cart"; 
import { Product } from "@/domain/models/Product"; 
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
  const [isInitialized, setIsInitialized] = useState(false);

  // ۱. لود کردن اولیه (Client-Side Only)
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart:", e);
        localStorage.removeItem("shopping-cart");
      }
    }
    setIsInitialized(true);
  }, []);

  // ۲. ذخیره تغییرات در LocalStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // ۳. افزودن به سبد
    // ۳. افزودن به سبد
    const addToCart = (product: Product | CartItem) => {
      const targetId = String(product.id);
      
      // --- اصلاح شده (Fix) ---
      // این خط با تبدیل اجباری به رشته، هم اعداد و هم رشته‌های دارای ویرگول را هندل می‌کند
      // و ارور never تایپ‌اسکریپت را برطرف می‌کند.
      const rawPrice = Number(String(product.price).replace(/\D/g, '')) || 0;
      // -----------------------
  
      // هندل کردن تصویر (اولین تصویر آرایه یا رشته تصویر)
      // @ts-ignore
      const imageSrc = product.image || (product.images && product.images.length > 0 ? product.images[0] : "");
      
      // @ts-ignore
      const productName = product.title || product.name || "محصول";
  
      const existingItemIndex = cartItems.findIndex((item) => String(item.id) === targetId);
  
      if (existingItemIndex > -1) {
        toast.success("تعداد محصول افزایش یافت");
        setCartItems((prev) => {
          const newItems = [...prev];
          newItems[existingItemIndex].quantity += 1;
          return newItems;
        });
      } else {
        toast.success("به سبد خرید اضافه شد");
        const newItem: CartItem = {
          id: product.id,
          title: productName,
          price: rawPrice,
          image: imageSrc,
          quantity: 1,
        } as unknown as CartItem;
  
        setCartItems((prev) => [...prev, newItem]);
      }
      
      setIsCartOpen(true);
    };
  

  // ۴. کاهش تعداد
  const decreaseQuantity = (productId: number | string) => {
    const targetId = String(productId);
    const existingItem = cartItems.find((item) => String(item.id) === targetId);

    if (existingItem?.quantity === 1) {
       removeFromCart(productId);
    } else {
       setCartItems((prev) =>
        prev.map((item) =>
          String(item.id) === targetId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  // ۵. حذف کامل
  const removeFromCart = (productId: number | string) => {
    toast.error("محصول حذف شد");
    const targetId = String(productId);
    setCartItems((prev) => prev.filter((item) => String(item.id) !== targetId));
  };

  const clearCart = () => {
    toast.success("سبد خرید خالی شد");
    setCartItems([]);
    localStorage.removeItem("shopping-cart");
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // ۶. محاسبات بهینه (Memoized)
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (Number(item.price) * item.quantity),
      0
    );
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  // نکته مهم: اینجا `return null` نداریم تا SSR خراب نشود.
  // کامپوننت‌ها رندر می‌شوند، اما کانتنت سبد خرید بعد از هیدریشن پر می‌شود.
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
