import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        sans: ['var(--font-vazir)'],
      },
    },
  },
  plugins: [],
};
export default config;