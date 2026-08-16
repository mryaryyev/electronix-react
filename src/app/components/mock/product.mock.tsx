import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from "../../../libs/enums/product.enum"
import { Product } from "../../../libs/types/product"

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000)

export const mockProducts: Product[] = [
  {
    _id: "p1",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.LAPTOP,
    productBrand: ProductBrand.APPLE,
    productName: "MacBook Air M4 13-inch",
    productPrice: 130000,
    productLeftCount: 12,
    productSpecs: {
      Display: "13.6 inches Liquid Retina",
      Chip: "M4",
      Battery: "18 hours video playback",
    },
    productImages: ["/img/laptop.webp"],
    productViews: 43,
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    _id: "p2",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.LAPTOP,
    productBrand: ProductBrand.APPLE,
    productName: "MacBook Pro M5 14-inch",
    productPrice: 300000,
    productLeftCount: 4,
    productSpecs: { Display: "14.2 inches Liquid Retina XDR", Chip: "M5 Pro" },
    productImages: ["/img/laptop.webp"],
    productViews: 39,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20),
  },
  {
    _id: "p3",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.LAPTOP,
    productBrand: ProductBrand.ASUS,
    productName: "ROG Strix G16",
    productPrice: 210000,
    productLeftCount: 7,
    productSpecs: { Display: "16 inches QHD 240Hz", Chip: "Intel Core i9" },
    productImages: ["/img/laptop.webp"],
    productViews: 26,
    createdAt: daysAgo(9),
    updatedAt: daysAgo(9),
  },
  {
    _id: "p4",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.SMARTPHONE,
    productBrand: ProductBrand.APPLE,
    productName: "iPhone 13",
    productPrice: 46000,
    productLeftCount: 15,
    productSpecs: {
      Display: "6.1 inches Super Retina XDR",
      Chip: "A15 Bionic",
    },
    productImages: ["/img/laptop.webp"],
    productViews: 14,
    createdAt: daysAgo(40),
    updatedAt: daysAgo(40),
  },
  {
    _id: "p5",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.SMARTPHONE,
    productBrand: ProductBrand.SAMSUNG,
    productName: "Galaxy S25 Ultra",
    productPrice: 128000,
    productLeftCount: 6,
    productSpecs: { Display: "6.9 inches Dynamic AMOLED 2X" },
    productImages: ["/img/laptop.webp"],
    productViews: 61,
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    _id: "p6",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.ACCESSORY,
    productBrand: ProductBrand.SAMSUNG,
    productName: "Samsung Buds Core",
    productPrice: 8500,
    productLeftCount: 30,
    productSpecs: { Battery: "Up to 18 hours with case" },
    productImages: ["/img/laptop.webp"],
    productViews: 8,
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
  },
]

export const categorySubGroups: Partial<
  Record<
    ProductCategory,
    { label: string; brand: ProductBrand; image: string }[]
  >
> = {
  [ProductCategory.LAPTOP]: [
    { label: "Macbook", brand: ProductBrand.APPLE, image: "/img/laptop.webp" },
    {
      label: "Windows Laptops",
      brand: ProductBrand.ASUS,
      image: "/img/laptop.webp",
    },
    {
      label: "Gaming Laptops",
      brand: ProductBrand.LENOVO,
      image: "/img/laptop.webp",
    },
  ],
  [ProductCategory.SMARTPHONE]: [
    {
      label: "iPhone",
      brand: ProductBrand.APPLE,
      image: "/img/smartphone.jpg",
    },
    {
      label: "Samsung Galaxy",
      brand: ProductBrand.SAMSUNG,
      image: "/img/smartphone.jpg",
    },
    {
      label: "Xiaomi",
      brand: ProductBrand.XIAOMI,
      image: "/img/smartphone.jpg",
    },
  ],
  [ProductCategory.TABLET]: [
    { label: "iPad", brand: ProductBrand.APPLE, image: "/img/sub/ipad.webp" },
    {
      label: "Galaxy Tab",
      brand: ProductBrand.SAMSUNG,
      image: "/img/sub/galaxytab.webp",
    },
  ],
  [ProductCategory.SMARTWATCH]: [
    {
      label: "Apple Watch",
      brand: ProductBrand.APPLE,
      image: "/img/sub/applewatch.webp",
    },
    {
      label: "Galaxy Watch",
      brand: ProductBrand.SAMSUNG,
      image: "/img/sub/galaxywatch.webp",
    },
  ],
}
