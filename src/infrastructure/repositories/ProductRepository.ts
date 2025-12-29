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