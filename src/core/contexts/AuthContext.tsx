"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// 1. ایمپورت کردن مدل استاندارد کاربر
import { User } from "@/core/entities/User";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  // 2. تغییر تابع لاگین برای دریافت جداگانه یوزر و توکن
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user_data");
      const token = Cookies.get("auth_token");

      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // 3. اصلاح تابع لاگین برای رفع ارور "Expected 1 arguments"
  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("user_data", JSON.stringify(userData));
    // ذخیره توکن در کوکی
    Cookies.set("auth_token", token, { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_data");
    Cookies.remove("auth_token");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
