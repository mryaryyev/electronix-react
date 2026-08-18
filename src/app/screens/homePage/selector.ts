import { createSelector } from "reselect"
import { AppRootState } from "../../../libs/types/screen"

const selectHomePage = (state: AppRootState) => state.homePage
export const retrieveTrendingGadgets = createSelector(
  selectHomePage,
  HomePage => HomePage.trendingGadgets,
)

export const retrieveLatestGadgets = createSelector(
  selectHomePage,
  HomePage => HomePage.latestGadgets,
)

export const retrievelatestIphones = createSelector(
  selectHomePage,
  HomePage => HomePage.latestIphones,
)

export const retrieveShopByBrand = createSelector(
  selectHomePage,
  HomePage => HomePage.shopByBrand,
)
