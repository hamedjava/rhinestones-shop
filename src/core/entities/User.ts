// src/core/entities/User.ts

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string; // اختیاری
    role: 'customer' | 'admin';
  }
  