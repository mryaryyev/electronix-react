import { ProductBrand, ProductCategory } from '../../../libs/enums/product.enum'

export interface CategoryNavItem {
  label: string
  category: ProductCategory
  subItems: { label: string; brand: ProductBrand; image: string; thumbSize?: string }[]
}

export const categoryNavItems: CategoryNavItem[] = [
  {
    label: 'Smartphones',
    category: ProductCategory.SMARTPHONE,
    subItems: [
      {
        label: 'Apple',
        brand: ProductBrand.APPLE,
        image: '/img/phone/apple.jpg',
        thumbSize: '130%',
      },
      {
        label: 'Samsung',
        brand: ProductBrand.SAMSUNG,
        image: '/img/phone/samsung.jpg',
        thumbSize: '90%',
      },
      {
        label: 'Xiaomi',
        brand: ProductBrand.XIAOMI,
        image: '/img/phone/xiaomi.jpg',
        thumbSize: '70%',
      },
    ],
  },
  {
    label: 'Laptops',
    category: ProductCategory.LAPTOP,
    subItems: [
      { label: 'Apple', brand: ProductBrand.APPLE, image: '/img/laptop/macbook.webp', thumbSize: '90%' },
      {
        label: 'Samsung',
        brand: ProductBrand.SAMSUNG,
        image: '/img/laptop/samsung.webp',
      },
      {
        label: 'Lenovo',
        brand: ProductBrand.LENOVO,
        image: '/img/laptop/lenovo.webp',
        thumbSize: '90%',
      },
    ],
  },
  {
    label: 'Tablets',
    category: ProductCategory.TABLET,
    subItems: [
      { label: 'Apple', brand: ProductBrand.APPLE, image: '/img/tablet/apple.jpg' },
      {
        label: 'Samsung',
        brand: ProductBrand.SAMSUNG,
        image: '/img/tablet/samsung.webp',
      },
    ],
  },
  {
    label: 'Smartwatch',
    category: ProductCategory.SMARTWATCH,
    subItems: [
      {
        label: 'Apple',
        brand: ProductBrand.APPLE,
        image: '/img/smartwatch/apple.jpeg',
      },
      {
        label: 'Samsung',
        brand: ProductBrand.SAMSUNG,
        image: '/img/smartwatch/samsung.webp',
        thumbSize: '75%',
      },
      {
        label: 'Xiaomi',
        brand: ProductBrand.XIAOMI,
        image: '/img/smartwatch/xiaomi.webp',
      },
    ],
  },
  {
    label: 'Cameras',
    category: ProductCategory.CAMERA,
    subItems: [
      {
        label: 'Samsung',
        brand: ProductBrand.SAMSUNG,
        image: '/img/camera/samsung.webp',
        thumbSize: '60%',
      },
      {
        label: 'Huawei',
        brand: ProductBrand.HUAWEI,
        image: '/img/camera/huawei.jpg',
        thumbSize: '65%',
      },
    ],
  },
  {
    label: 'Accessories',
    category: ProductCategory.ACCESSORY,
    subItems: [
      {
        label: 'Apple',
        brand: ProductBrand.APPLE,
        image: '/img/accessory/apple.webp',
        thumbSize: '90%',
      },
    ],
  },
]
