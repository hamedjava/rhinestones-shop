import { Product } from "@/core/entities/Product";

// توجه: در Next.js پوشه public در آدرس‌دهی حذف می‌شود.
// وقتی فایل در public/images/pic1.jpg است، آدرس آن /images/pic1.jpg می‌شود.

const productsData: Product[] = [
  {
    id: 1,
    name: "انگشتر الماس طرح خورشید",
    price: 25500000,
    description: "انگشتر طلای سفید ۱۸ عیار با طراحی خاص و نگین‌های درخشان.",
    image: "/images/pic1.jpg", 
    category: "انگشتر",
    isFeatured: true,
  },
  {
    id: 2,
    name: "گردنبند طلا ظریف",
    price: 12800000,
    description: "گردنبند مینیمال با زنجیر ونیزی و پلاک ظریف.",
    image: "/images/pic2.jpg",
    category: "گردنبند",
    isFeatured: true,
  },
  {
    id: 3,
    name: "گوشواره آویز مجلسی",
    price: 18400000,
    description: "گوشواره‌های بلند با طراحی مدرن و تراش‌های ظریف دستی.",
    image: "/images/pic3.jpg",
    category: "گوشواره",
    isFeatured: false,
  },
  {
    id: 4,
    name: "دستبند چرم و طلا",
    price: 4200000,
    description: "دستبند اسپرت با چرم طبیعی درجه یک.",
    image: "/images/pic4.jpg",
    category: "دستبند",
    isFeatured: true,
  },
  {
    id: 5,
    name: "نیم‌ست یاقوت کبود",
    price: 45000000,
    description: "ست شامل گردنبند و گوشواره با سنگ یاقوت اصل.",
    image: "/images/pic5.webp", // پسوند webp طبق عکس شما
    category: "نیم‌ست",
    isFeatured: true,
  },
  {
    id: 6,
    name: "انگشتر نامزدی سولیتر",
    price: 32000000,
    description: "انگشتر تک نگین برلیان با پایه‌ی طلای سفید.",
    image: "/images/pic6.jpg",
    category: "انگشتر",
    isFeatured: true,
  },
  {
    id: 7,
    name: "رولباسی طلای توپی",
    price: 21500000,
    description: "گردنبند بلند رولباسی با گوی‌های تراش‌دار.",
    image: "/images/pic7.webp", // پسوند webp طبق عکس شما
    category: "گردنبند",
    isFeatured: false,
  },
  {
    id: 8,
    name: "گوشواره میخی مروارید",
    price: 3800000,
    description: "گوشواره میخی ساده و شیک با مروارید پرورشی.",
    image: "/images/pic8.webp", // پسوند webp طبق عکس شما
    category: "گوشواره",
    isFeatured: false,
  },
  {
    id: 9,
    name: "دستبند کارتیر پهن",
    price: 55000000,
    description: "دستبند زنجیری مدل کارتیر با وزن بالا.",
    image: "/images/pic9.jpg",
    category: "دستبند",
    isFeatured: true,
  },
  {
    id: 10,
    name: "پلاک طلا طرح انار",
    price: 2900000,
    description: "پلاک تک طرح انار، هدیه‌ای ظریف و زیبا.",
    image: "/images/pic10.jpg",
    category: "پلاک",
    isFeatured: false,
  },
];

export class ProductRepository {
  static getAll(): Product[] {
    return productsData;
  }

  static getFeatured(): Product[] {
    return productsData.filter((p) => p.isFeatured);
  }

  static getById(id: number): Product | undefined {
    return productsData.find((p) => p.id === id);
  }
}
