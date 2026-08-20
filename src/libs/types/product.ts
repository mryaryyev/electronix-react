import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from "../enums/product.enum"
import { T } from "./common"

export interface Product {
  _id: string
  productStatus: ProductStatus
  productCategory: ProductCategory
  productBrand: ProductBrand
  productName: string
  productPrice: number
  productLeftCount: number
  productSpecs?: T
  productDesc?: string
  productImages: string[]
  productViews: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductInquiry {
  order: string
  page: number
  limit: number
  productCategory?: ProductCategory
  productBrand?: ProductBrand
  search?: string
  minPrice?: number
  maxPrice?: number
}
