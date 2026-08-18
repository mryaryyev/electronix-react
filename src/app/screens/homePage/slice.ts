import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HomePageState } from "../../../libs/types/screen"
import { Product } from "../../../libs/types/product"

const initialState: HomePageState = {
  trendingGadgets: [],
  latestGadgets: [],
  latestIphones: [],
  shopByBrand: [],
}

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTrendingGadgets: (state, action: PayloadAction<Product[]>) => {
      state.trendingGadgets = action.payload
    },
    setLatestGadgets: (state, action: PayloadAction<Product[]>) => {
      state.latestGadgets = action.payload
    },
    setLatestIphones: (state, action: PayloadAction<Product[]>) => {
      state.latestIphones = action.payload
    },
    setShopByBrand: (state, action: PayloadAction<Product[]>) => {
      state.shopByBrand = action.payload
    },
  },
})

export const {
  setTrendingGadgets,
  setLatestGadgets,
  setLatestIphones,
  setShopByBrand,
} = homePageSlice.actions

const HomePageReducer = homePageSlice.reducer
export default HomePageReducer
