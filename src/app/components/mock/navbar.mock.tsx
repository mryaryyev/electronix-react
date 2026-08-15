import { ProductCategory } from "../../../libs/enums/product.enum"

export interface CategoryNavItem {
  label: string
  category: ProductCategory
  subItems: { label: string; image: string }[]
}

export const categoryNavItems: CategoryNavItem[] = [
  {
    label: "Smartphones",
    category: ProductCategory.SMARTPHONE,
    subItems: [
      { label: "iPhone", image: "/img/smartphone.jpg" },
      { label: "Samsung Galaxy", image: "/img/smartphone.jpg" },
      { label: "Xiaomi", image: "/img/smartphone.jpg" },
    ],
  },
  {
    label: "Laptops",
    category: ProductCategory.LAPTOP,
    subItems: [
      { label: "Macbook", image: "/img/laptop.webp" },
      { label: "Windows Laptops", image: "/img/laptop.webp" },
      { label: "Gaming Laptops", image: "/img/laptop.webp" },
    ],
  },
  {
    label: "Tablets",
    category: ProductCategory.TABLET,
    subItems: [
      { label: "iPad", image: "/img/tablet.webp" },
      { label: "Galaxy Tab", image: "/img/tablet.webp" },
    ],
  },
  {
    label: "Smartwatch",
    category: ProductCategory.SMARTWATCH,
    subItems: [
      { label: "Apple Watch", image: "/img/smartwatch.webp" },
      { label: "Galaxy Watch", image: "/img/smartwatch.webp" },
    ],
  },
  {
    label: "Cameras",
    category: ProductCategory.CAMERA,
    subItems: [{ label: "Canon", image: "/img/camera.webp" }],
  },
  {
    label: "Accessories",
    category: ProductCategory.ACCESSORY,
    subItems: [
      { label: "Adapters & Cables", image: "/img/accessory.jpg" },
      { label: "Mouse & Keyboard", image: "/img/accessory.jpg" },
    ],
  },
]
