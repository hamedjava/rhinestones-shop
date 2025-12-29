const fs = require('fs');
const path = require('path');

// 1. Define the folder structure and file contents
const structure = {
  'public/images': {}, // Placeholder for images
  'src': {
    'core': {
      'entities': {
        'Product.ts': `
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
}
        `
      },
      'usecases': {
        // Business logic placeholders
        'README.md': '# Use Cases Layer\nPlace your application specific business rules here.'
      }
    },
    'infrastructure': {
      'repositories': {
        'ProductRepository.ts': `
import { Product } from "@/core/entities/Product";

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'انگشتر الماس تراش برلیان',
    price: 57000000,
    category: 'انگشتر',
    image: '/images/ring1.jpg',
    rating: 5,
    isNew: true
  },
  {
    id: '2',
    title: 'حلقه ازدواج طلا و زمرد',
    price: 32500000,
    category: 'حلقه',
    image: '/images/ring2.jpg',
    rating: 4
  },
  {
    id: '3',
    title: 'گردنبند مروارید اصل',
    price: 12800000,
    category: 'گردنبند',
    image: '/images/necklace1.jpg',
    rating: 5
  },
  {
    id: '4',
    title: 'دستبند زنجیری کارتیر',
    price: 95000000,
    category: 'دستبند',
    image: '/images/bracelet1.jpg',
    rating: 4.5
  },
];

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockProducts), 500));
};
        `
      }
    },
    'presentation': {
      'components': {
        'Header.tsx': `
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wider text-secondary">زمــرد</div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-secondary transition">صفحه اصلی</Link>
          <Link href="/rings" className="hover:text-secondary transition">انگشتر</Link>
          <Link href="/necklaces" className="hover:text-secondary transition">گردنبند</Link>
          <Link href="/bracelets" className="hover:text-secondary transition">دستبند</Link>
          <Link href="/sets" className="hover:text-secondary transition">سرویس کامل</Link>
          <Link href="/blog" className="hover:text-secondary transition">مجله</Link>
        </nav>
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 hover:text-secondary transition cursor-pointer" />
          <Link href="/cart" className="hover:text-secondary transition relative">
             <ShoppingBag className="w-5 h-5" />
             <span className="absolute -top-2 -right-2 bg-secondary text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </Link>
          <Link href="/login" className="hover:text-secondary transition">
             <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
        `,
        'Footer.tsx': `
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8 border-t-4 border-secondary">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-6">زمــرد</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            ارائه دهنده لوکس‌ترین جواهرات با ضمانت اصالت و کیفیت. زیبایی را با ما تجربه کنید.
          </p>
          <div className="flex gap-4">
             <Instagram className="cursor-pointer hover:text-secondary"/>
             <Twitter className="cursor-pointer hover:text-secondary"/>
             <Facebook className="cursor-pointer hover:text-secondary"/>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">دسترسی سریع</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-secondary transition">درباره ما</a></li>
            <li><a href="#" className="hover:text-secondary transition">تماس با ما</a></li>
          </ul>
        </div>
        <div>
           <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">عضویت در خبرنامه</h3>
           <div className="flex mt-4">
             <input type="email" placeholder="ایمیل..." className="bg-white/5 border border-white/10 px-4 py-2 w-full outline-none text-white" />
             <button className="bg-secondary text-primary font-bold px-4 hover:bg-white transition">ارسال</button>
           </div>
        </div>
      </div>
      <div className="text-center text-gray-600 border-t border-white/5 pt-8 text-sm">
        © 1403 تمام حقوق برای جواهری زمرد محفوظ است.
      </div>
    </footer>
  );
}
        `,
        'ProductCard.tsx': `
import { Product } from "@/core/entities/Product";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl hover:border-secondary/30">
      <div className="relative w-full h-64 mb-4 overflow-hidden bg-gray-50 flex items-center justify-center">
        {product.isNew && (
            <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 z-10">جدید</span>
        )}
        <div className="w-40 h-40 bg-gray-200 rounded-full group-hover:scale-110 transition duration-500 flex items-center justify-center text-gray-400 text-xs">
            تصویر محصول
        </div>
        <button className="absolute bottom-0 w-full bg-primary text-white py-2 translate-y-full group-hover:translate-y-0 transition duration-300">
            افزودن به سبد
        </button>
      </div>
      <div className="text-center">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-bold text-lg text-primary mb-2 line-clamp-1">{product.title}</h3>
        <div className="flex justify-center gap-0.5 mb-3 text-secondary">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < (product.rating || 0) ? "currentColor" : "none"} className={i < (product.rating || 0) ? "text-secondary" : "text-gray-300"} />
            ))}
        </div>
        <div className="text-lg font-bold text-primary">
          {product.price.toLocaleString('fa-IR')} <span className="text-sm font-normal text-gray-500">تومان</span>
        </div>
      </div>
    </div>
  );
}
        `
      },
      'modules': {
        'HeroSection.tsx': `
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] bg-primary-dark overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#082224] via-[#0F393B] to-[#1A5F63]">
         {/* Placeholder for Hero Image */}
         <div className="absolute right-0 top-0 h-full w-1/2 bg-white/5 opacity-20"></div> 
      </div>

      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-start text-white max-w-4xl">
        <h2 className="text-lg md:text-xl text-secondary mb-4 font-light">کلکسیون جدید ۲۰۲۵</h2>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          زیبایی ابدی <br />
          جواهرات فاخر
        </h1>
        <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
          مجموعه‌ای از بهترین سنگ‌های قیمتی و طراحی‌های منحصر به فرد که درخششی جاودانه به شما می‌بخشد.
        </p>
        <button className="bg-secondary hover:bg-white hover:text-primary text-primary-dark font-bold py-3 px-10 rounded-none transition duration-300 transform hover:scale-105">
          مشاهده مجموعه
        </button>
      </div>
    </section>
  );
}
        `,
        'NewArrivals.tsx': `
import { Product } from "@/core/entities/Product";
import ProductCard from "../components/ProductCard";

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">جدیدترین جواهرات</h2>
            <p className="text-gray-500">انتخابی خاص برای سلیقه‌های خاص</p>
          </div>
          <button className="text-primary font-bold hover:text-secondary transition flex items-center gap-2">
            مشاهده همه <span>&larr;</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
        `
      },
      'styles': {
         // Styles are mainly in global.css, but this folder is here for modular css if needed
      }
    }
  },
  'app': {
    'layout.tsx': `
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({ 
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "جواهرات لوکس زمرد",
  description: "فروشگاه اینترنتی جواهرات و زیورآلات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={\`\${vazir.variable} font-sans bg-surface text-text-main\`}>
        {children}
      </body>
    </html>
  );
}
    `,
    'page.tsx': `
import { getFeaturedProducts } from "@/infrastructure/repositories/ProductRepository";
import Header from "@/presentation/components/Header";
import Footer from "@/presentation/components/Footer";
import HeroSection from "@/presentation/modules/HeroSection";
import NewArrivals from "@/presentation/modules/NewArrivals";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      
      <section className="grid grid-cols-2 h-64 w-full">
         <div className="bg-[#EBEBEB] flex items-center justify-center relative overflow-hidden group cursor-pointer border-l border-white">
            <div className="z-10 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">کالکشن عروس</h3>
                <span className="text-sm border-b border-primary pb-1">مشاهده</span>
            </div>
         </div>
         <div className="bg-[#D4AF37] flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="z-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">هدیه‌های خاص</h3>
                <span className="text-sm border-b border-white text-white pb-1">خرید کنید</span>
            </div>
         </div>
      </section>

      <NewArrivals products={products} />

      <section className="bg-primary py-20 text-white text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-serif mb-6">سفارشی سازی جواهرات</h2>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8">
                ما طرح رویایی شما را به واقعیت تبدیل می‌کنیم. با طراحان ما در تماس باشید تا قطعه‌ای منحصر به فرد مختص خودتان داشته باشید.
            </p>
            <button className="border border-secondary text-secondary hover:bg-secondary hover:text-primary px-8 py-3 transition duration-300">
                مشاوره رایگان
            </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
    `
  }
};

// 2. Helper function to create directories and files
function createStructure(basePath, structure) {
  for (const key in structure) {
    const fullPath = path.join(basePath, key);
    
    // If it's an object, it's a directory
    if (typeof structure[key] === 'object') {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`📁 Created folder: ${fullPath}`);
      }
      createStructure(fullPath, structure[key]);
    } 
    // If it's a string, it's a file content
    else if (typeof structure[key] === 'string') {
      fs.writeFileSync(fullPath, structure[key].trim());
      console.log(`📄 Created file: ${fullPath}`);
    }
  }
}

// 3. Run the script
console.log('🚀 Starting Clean Architecture setup...');
createStructure(process.cwd(), structure);

// 4. Update tailwind config separately to ensure it overwrites correctly
const tailwindConfigContent = `
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
`;

fs.writeFileSync(path.join(process.cwd(), 'tailwind.config.ts'), tailwindConfigContent.trim());
console.log(`📄 Updated tailwind.config.ts`);

console.log('✅ Setup complete! Don\'t forget to install dependencies:');
console.log('npm install lucide-react');
