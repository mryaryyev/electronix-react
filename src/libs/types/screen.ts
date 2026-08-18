import { Product } from "./product"

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState
}

/** HOMEPAGE */
export interface HomePageState {
  trendingGadgets: Product[]
  latestGadgets: Product[]
  latestIphones: Product[]
  shopByBrand: Product[]
}

/** PRODUCTS PAGE */

/** ORDERS PAGE */
