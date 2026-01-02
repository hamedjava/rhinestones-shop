import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // این خط به تنهایی کافی است چون تمام زیرمجموعه‌های src را می‌خواند
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F393B',
          light: '#1A5F63',
          dark: '#082224',
        },
        secondary: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
        },
        surface: '#F9F9F9',
        text: {
          main: '#333333',
          muted: '#666666',
        }
      },
      fontFamily: {
        // مطمئن شوید فونت وزیر را در layout.tsx لود کرده‌اید
        sans: ['var(--font-vazir)'], 
      },
    },
  },
  plugins: [],
};
export default config;
