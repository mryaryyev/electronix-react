import { Order } from "./order"
import { Product } from "./product"

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState
  productsPage: ProductsPageState
  ordersPage: OrdersPageState
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
  chosenProduct: Product | null
}

/** ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[]
  processOrders: Order[]
  finishedOrders: Order[]
}
