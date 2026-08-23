import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductsPageState } from "../../../libs/types/screen"
import { Product } from "../../../libs/types/product"

const initialState: ProductsPageState = {
  products: [],
  chosenProduct: null,
}

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    setChosenProduct: (state, action: PayloadAction<Product | null>) => {
      state.chosenProduct = action.payload
    },
  },
})

export const { setProducts, setChosenProduct } = productsPageSlice.actions

const ProductsPageReducer = productsPageSlice.reducer
export default ProductsPageReducer
