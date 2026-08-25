import { ProductBrand, ProductCategory } from "../../../libs/enums/product.enum"

export interface CategoryNavItem {
  label: string
  category: ProductCategory
  subItems: { label: string; brand: ProductBrand; image: string }[]
}

export const categoryNavItems: CategoryNavItem[] = [
  {
    label: "Smartphones",
    category: ProductCategory.SMARTPHONE,
    subItems: [
      {
        label: "Apple",
        brand: ProductBrand.APPLE,
        image: "/img/smartphone.jpg",
      },
      {
        label: "Samsung",
        brand: ProductBrand.SAMSUNG,
        image: "/img/smartphone.jpg",
      },
      {
        label: "Xiaomi",
        brand: ProductBrand.XIAOMI,
        image: "/img/smartphone.jpg",
      },
    ],
  },
  {
    label: "Laptops",
    category: ProductCategory.LAPTOP,
    subItems: [
      { label: "Apple", brand: ProductBrand.APPLE, image: "/img/laptop.webp" },
      {
        label: "Samsung",
        brand: ProductBrand.SAMSUNG,
        image: "/img/laptop.webp",
      },
      {
        label: "Lenovo",
        brand: ProductBrand.LENOVO,
        image: "/img/laptop.webp",
      },
      { label: "Asus", brand: ProductBrand.ASUS, image: "/img/laptop.webp" },
    ],
  },
  {
    label: "Tablets",
    category: ProductCategory.TABLET,
    subItems: [
      { label: "Apple", brand: ProductBrand.APPLE, image: "/img/tablet.webp" },
      {
        label: "Samsung",
        brand: ProductBrand.SAMSUNG,
        image: "/img/tablet.webp",
      },
      {
        label: "Xiaomi",
        brand: ProductBrand.XIAOMI,
        image: "/img/tablet.webp",
      },
    ],
  },
  {
    label: "Smartwatch",
    category: ProductCategory.SMARTWATCH,
    subItems: [
      {
        label: "Apple",
        brand: ProductBrand.APPLE,
        image: "/img/smartwatch.webp",
      },
      {
        label: "Samsung",
        brand: ProductBrand.SAMSUNG,
        image: "/img/smartwatch.webp",
      },
      {
        label: "Xiaomi",
        brand: ProductBrand.XIAOMI,
        image: "/img/smartwatch.webp",
      },
    ],
  },
  {
    label: "Cameras",
    category: ProductCategory.CAMERA,
    subItems: [
      {
        label: "Samsung",
        brand: ProductBrand.SAMSUNG,
        image: "/img/camera.webp",
      },
      {
        label: "Huawei",
        brand: ProductBrand.HUAWEI,
        image: "/img/camera.webp",
      },
    ],
  },
  {
    label: "Accessories",
    category: ProductCategory.ACCESSORY,
    subItems: [
      {
        label: "Apple",
        brand: ProductBrand.APPLE,
        image: "/img/accessory.jpg",
      },
      {
        label: "Samsung",
        brand: ProductBrand.SAMSUNG,
        image: "/img/accessory.jpg",
      },
    ],
  },
]
