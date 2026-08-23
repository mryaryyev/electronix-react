import { Product } from "./product"

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState
  productsPage: ProductsPageState
}

/** HOMEPAGE */
export interface HomePageState {
  trendingGadgets: Product[]
  latestGadgets: Product[]
  latestIphones: Product[]
  shopByBrand: Product[]
}

/** PRODUCTS PAGE */
export interface ProductsPageState {
  products: Product[]
}

/** ORDERS PAGE */
