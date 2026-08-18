import { useEffect } from "react"
import Categories from "./Categories"
import TrendingGadgets from "./TrendingGadgets"
import LatestGadgets from "./LatestGadgets"
import LatestIphones from "./LatestIphones"
import ShopByBrand from "./ShopByBrand"
import Advertisement from "./Advertisement"
import Events from "./Events"
import "../../../css/home/home.css"

import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import { createSelector } from "reselect"
import { setTrendingGadgets } from "./slice"
import { retrieveTrendingGadgets } from "./selector"
import { Product } from "../../../libs/types/product"

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setTrendingGadgets: (data: Product[]) => dispatch(setTrendingGadgets(data)),
})
const trendingGadgetsRetriever = createSelector(
  retrieveTrendingGadgets,
  trendingGadgets => ({ trendingGadgets }),
)

export default function HomePage() {
  const { setTrendingGadgets } = actionDispatch(useDispatch())
  const { trendingGadgets } = useSelector(trendingGadgetsRetriever)
  useEffect(() => {
    return () => {}
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
