// src/infrastructure/repositories/ProductRepository.ts

import { Product } from "@/domain/models/Product";

// دیتای نمونه (بعداً می‌توانید این‌ها را از API بگیرید)
const products: Product[] = [
  {
    id: "1",
    name: "گردنبند الماس رویال",
    description: "یک شاهکار هنری ساخته شده از طلای ۱۸ عیار و الماس‌های تراش برلیان. مناسب برای مجالس خاص و هدیه‌ای ماندگار.",
    price: 155000000,
    images: ["/images/pic1.jpg", "/images/pic2.jpg"], // اطمینان حاصل کنید این عکس‌ها در پوشه public باشند
    category: "گردنبند",
    isFeatured: true,
  },
  {
    id: "2",
    name: "انگشتر سولیتر کلاسیک",
    description: "طراحی مینیمال و در عین حال خیره‌کننده. نگین مرکزی زیرکونیای درجه یک با پایه طلای سفید.",
    price: 45000000,
    images: ["/images/pic3.jpg"],
    category: "انگشتر",
    isFeatured: true,
  },
  {
    id: "3",
    name: "گوشواره آویز مروارید",
    description: "تلفیقی از مروارید طبیعی خلیج فارس و طراحی مدرن. سبک و راحت برای استفاده روزمره.",
    price: 28000000,
    images: ["/images/pic4.jpg"],
    category: "گوشواره",
    isFeatured: false,
  },
  {
    id: "4",
    name: "دستبند تنیسی طلا",
    description: "دستبند لوکس با قطعات متحرک که به نرمی روی دست می‌نشیند. درخشش بی‌نظیر در هر زاویه.",
    price: 98000000,
    images: ["/images/pic5.webp"],
    category: "دستبند",
    isFeatured: false,
  },
  {
    id: "5",
    name: "نیم‌ست یاقوت سرخ",
    description: "شامل گردنبند و گوشواره با نگین‌های یاقوت سرخ خون کبوتری. نماد عشق و شور.",
    price: 210000000,
    images: ["/images/pic6.jpg"],
    category: "نیم‌ست",
    isFeatured: true,
  },
];

export const ProductRepository = {
  // گرفتن همه محصولات
  getAll: (): Product[] => {
    return products;
  },

  // گرفتن یک محصول خاص با ID
  getById: (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  },
  
  // گرفتن محصولات ویژه (برای صفحه اصلی)
  getFeatured: (): Product[] => {
    return products.filter((product) => product.isFeatured);
  }
};
