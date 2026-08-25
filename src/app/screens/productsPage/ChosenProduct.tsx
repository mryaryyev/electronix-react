import { useEffect } from "react"
import { useParams, NavLink } from "react-router-dom"
import { Box, Container, Stack, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import { createSelector } from "reselect"
import ProductService from "../../services/ProductService"
import { setChosenProduct } from "./slice"
import { retrieveChosenProduct } from "./selector"
import { serverApi } from "../../../libs/config"
import { Product } from "../../../libs/types/product"
import {
  isNewProduct,
  formatBrandOrCategory,
} from "../../../libs/utils/product.utils"
import { useGlobals } from "../../hooks/useGlobals"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import "../../../css/chosenProduct.css"

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product | null) => dispatch(setChosenProduct(data)),
})
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  chosenProduct => ({ chosenProduct }),
)

export default function ChosenProduct() {
  const { productId } = useParams()
  const { setChosenProduct } = actionDispatch(useDispatch())
  const { chosenProduct } = useSelector(chosenProductRetriever)
  const { BASKET } = useGlobals()
  const { onAdd } = BASKET

  useEffect(() => {
    const productService = new ProductService()
    productService
      .getProduct(productId)
      .then(data => {
        setChosenProduct(data)
      })
      .catch(err => {
        console.log(err)
        setChosenProduct(null)
      })
  }, [productId])

  if (!chosenProduct) return null

  const isNew = isNewProduct(chosenProduct.createdAt)
  const categoryLabel = formatBrandOrCategory(chosenProduct.productCategory)
  const imagePath = `${serverApi}/${chosenProduct.productImages[0]}`

  const addToCartHandler = () => {
    onAdd({
      _id: chosenProduct._id,
      quantity: 1,
      name: chosenProduct.productName,
      price: chosenProduct.productPrice,
      image: chosenProduct.productImages[0],
    })
  }

  return (
    <div className="chosen-product">
      <Container className="product-container">
        <Box className="breadcrumb">
          <NavLink to="/">Home</NavLink> &gt;{" "}
          <NavLink to={`/products/${chosenProduct.productCategory}`}>
            {categoryLabel}
          </NavLink>
          &gt;{" "}
          <NavLink to={`/products/brand/${chosenProduct.productBrand}`}>
            {chosenProduct.productBrand}
          </NavLink>
          &gt; <b>{chosenProduct.productName}</b>
        </Box>

        <Stack direction="row" spacing={4} className="product-main">
          <Stack className="chosen-product-image">
            {isNew && <Box className="badge-new">NEW</Box>}
            <img
              src={imagePath}
              alt={chosenProduct.productName}
              className="chosen-image"
            />
          </Stack>

          <Stack className="chosen-product-info">
            <Box className="info-box">
              <Typography className="pdp-eyebrow">
                {chosenProduct.productBrand}
              </Typography>
              <strong className="product-name">
                {chosenProduct.productName}
              </strong>

              <div className="product-price">
                <span>$</span>
                <span>{chosenProduct.productPrice.toLocaleString()}</span>
              </div>

              {chosenProduct.productSpecs &&
                Object.keys(chosenProduct.productSpecs).length > 0 && (
                  <Box className="keyfeatures">
                    <h4>Key Features</h4>
                    <ul>
                      {Object.entries(chosenProduct.productSpecs).map(
                        ([key, value]) => (
                          <li key={key}>
                            <b>{key}:</b> {String(value)}
                          </li>
                        ),
                      )}
                    </ul>
                  </Box>
                )}

              <div className="button-box">
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={addToCartHandler}
                >
                  Add To Basket
                </Button>
              </div>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
