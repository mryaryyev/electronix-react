import { useEffect } from "react"
import { useParams, NavLink } from "react-router-dom"
import { Container, Stack, Typography } from "@mui/material"
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
import "../../../css/productDetail.css"

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product | null) => dispatch(setChosenProduct(data)),
})
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  chosenProduct => ({ chosenProduct }),
)

export default function ChosenProduct() {
  const { id } = useParams()
  const { setChosenProduct } = actionDispatch(useDispatch())
  const { chosenProduct } = useSelector(chosenProductRetriever)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (!id) return

    const productService = new ProductService()
    productService
      .getProduct(id)
      .then(data => {
        setChosenProduct(data)
      })
      .catch(err => {
        console.log(err)
        setChosenProduct(null)
      })
  }, [id])

  if (!chosenProduct) {
    return null
  }

  const isNew = isNewProduct(chosenProduct.createdAt)
  const categoryLabel = formatBrandOrCategory(chosenProduct.productCategory)
  const imagePath = `${serverApi}/${chosenProduct.productImages[0]}`

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: "1300px" }}
      className="product-detail-page"
    >
      <div className="breadcrumb">
        Home &gt;{" "}
        <NavLink to={`/products/${chosenProduct.productCategory}`}>
          {categoryLabel}
        </NavLink>
        &gt;{" "}
        <NavLink to={`/products/brand/${chosenProduct.productBrand}`}>
          {chosenProduct.productBrand}
        </NavLink>
        &gt; <b>{chosenProduct.productName}</b>
      </div>

      <div className="pdp-grid">
        <div className="pdp-image">
          {isNew && <span className="badge-new">NEW</span>}
          <img src={imagePath} alt={chosenProduct.productName} />
        </div>

        <div className="pdp-info">
          <Typography className="pdp-eyebrow">
            {chosenProduct.productBrand}
          </Typography>
          <Typography className="pdp-title">
            {chosenProduct.productName}
          </Typography>
          <Typography className="pdp-price">
            <span className="currency">$</span>
            {chosenProduct.productPrice.toLocaleString()}
          </Typography>

          {chosenProduct.productSpecs &&
            Object.keys(chosenProduct.productSpecs).length > 0 && (
              <div className="keyfeatures">
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
              </div>
            )}

          <Stack direction="row" className="pdp-actions">
            <button className="btn-addcart">Add to Cart</button>
          </Stack>
        </div>
      </div>
    </Container>
  )
}
