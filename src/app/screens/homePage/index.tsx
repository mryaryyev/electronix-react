import { useEffect } from "react"
import Categories from "./Categories"
import TrendingGadgets from "./TrendingGadgets"
import LatestGadgets from "./LatestGadgets"
import LatestIphones from "./LatestIphones"
import ShopByBrand from "./ShopByBrand"
import Advertisement from "./Advertisement"
import Events from "./Events"
import "../../../css/home/home.css"

import { useDispatch } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import {
  setTrendingGadgets,
  setLatestGadgets,
  setLatestIphones,
  setShopByBrand,
} from "./slice"
import { Product } from "../../../libs/types/product"
import ProductService from "../../services/ProductService"
import { ProductBrand, ProductCategory } from "../../../libs/enums/product.enum"

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setTrendingGadgets: (data: Product[]) => dispatch(setTrendingGadgets(data)),
  setLatestGadgets: (data: Product[]) => dispatch(setLatestGadgets(data)),
  setLatestIphones: (data: Product[]) => dispatch(setLatestIphones(data)),
  setShopByBrand: (data: Product[]) => dispatch(setShopByBrand(data)),
})

export default function HomePage() {
  const {
    setTrendingGadgets,
    setLatestGadgets,
    setLatestIphones,
    setShopByBrand,
  } = actionDispatch(useDispatch())
  useEffect(() => {
    const product = new ProductService()
    product
      .getProducts({
        page: 1,
        limit: 5,
        order: "productViews",
      })
      .then(data => {
        setTrendingGadgets(data)
      })
      .catch(err => {
        console.log(err)
      })

    product
      .getProducts({
        page: 1,
        limit: 5,
        order: "createdAt",
      })
      .then(data => {
        setLatestGadgets(data)
      })
      .catch(err => {
        console.log(err)
      })

    product
      .getProducts({
        page: 1,
        limit: 5,
        order: "createdAt",
        productCategory: ProductCategory.SMARTPHONE,
        productBrand: ProductBrand.APPLE,
      })
      .then(data => {
        setLatestIphones(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="homepage">
      <Categories />
      <TrendingGadgets />
      <LatestGadgets />
      <LatestIphones />
      <ShopByBrand />
      <Advertisement />
      <Events />
    </div>
  )
}
