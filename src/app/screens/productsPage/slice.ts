import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductsPageState } from "../../../libs/types/screen"
import { Product } from "../../../libs/types/product"

const initialState: ProductsPageState = {
  products: [],
}

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
  },
})

export const { setProducts } = productsPageSlice.actions

const ProductsPageReducer = productsPageSlice.reducer
export default ProductsPageReducer
