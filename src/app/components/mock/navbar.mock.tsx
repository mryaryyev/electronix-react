import { ProductBrand, ProductCategory } from '../../../libs/enums/product.enum'

export interface CategoryNavItem {
  label: string
  category: ProductCategory
  subItems: { label: string; brand: ProductBrand; image: string }[]
}

// Images are 800x800 WebP with the product centered on white (same padding), so no per-image sizing is needed.
export const categoryNavItems: CategoryNavItem[] = [
  {
    label: 'Smartphones',
    category: ProductCategory.SMARTPHONE,
    subItems: [
      { label: 'Apple', brand: ProductBrand.APPLE, image: '/img/phone/apple.webp' },
      { label: 'Samsung', brand: ProductBrand.SAMSUNG, image: '/img/phone/samsung.webp' },
      { label: 'Xiaomi', brand: ProductBrand.XIAOMI, image: '/img/phone/xiaomi.webp' },
    ],
  },
  {
    label: 'Laptops',
    category: ProductCategory.LAPTOP,
    subItems: [
      { label: 'Apple', brand: ProductBrand.APPLE, image: '/img/laptop/macbook.webp' },
      { label: 'Samsung', brand: ProductBrand.SAMSUNG, image: '/img/laptop/samsung.webp' },
      { label: 'Lenovo', brand: ProductBrand.LENOVO, image: '/img/laptop/lenovo.webp' },
    ],
  },
  {
    label: 'Tablets',
    category: ProductCategory.TABLET,
    subItems: [
      { label: 'Apple', brand: ProductBrand.APPLE, image: '/img/tablet/apple.webp' },
      { label: 'Samsung', brand: ProductBrand.SAMSUNG, image: '/img/tablet/samsung.webp' },
    ],
  },
  {
    label: 'Smartwatch',
    category: ProductCategory.SMARTWATCH,
    subItems: [
      { label: 'Apple', brand: ProductBrand.APPLE, image: '/img/smartwatch/apple.webp' },
      { label: 'Samsung', brand: ProductBrand.SAMSUNG, image: '/img/smartwatch/samsung.webp' },
      { label: 'Xiaomi', brand: ProductBrand.XIAOMI, image: '/img/smartwatch/xiaomi.webp' },
    ],
  },
  {
    label: 'Cameras',
    category: ProductCategory.CAMERA,
    subItems: [
      { label: 'Samsung', brand: ProductBrand.SAMSUNG, image: '/img/camera/samsung.webp' },
      { label: 'Huawei', brand: ProductBrand.HUAWEI, image: '/img/camera/huawei.webp' },
    ],
  },
  {
    label: 'Accessories',
    category: ProductCategory.ACCESSORY,
    subItems: [{ label: 'Apple', brand: ProductBrand.APPLE, image: '/img/accessory/apple.webp' }],
  },
]
