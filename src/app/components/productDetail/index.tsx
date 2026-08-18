import { useParams, NavLink } from "react-router-dom"
import { Container, Stack, Typography } from "@mui/material"
import { mockProducts } from "../mock/product.mock"
import { useState } from "react"
import "../../../css/productDetail.css"

const CATEGORY_LABELS: Record<string, string> = {
  SMARTPHONE: "Smartphones",
  LAPTOP: "Laptops",
  TABLET: "Tablets",
  SMARTWATCH: "Smartwatch",
  CAMERA: "Cameras",
  ACCESSORY: "Accessories",
}

const NEW_THRESHOLD_DAYS = 14

function isNewProduct(createdAt: Date): boolean {
  const diffMs = Date.now() - new Date(createdAt).getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays <= NEW_THRESHOLD_DAYS
}

export default function ProductDetail() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts.find(p => p._id === id)

  if (!product) {
    return (
      <Container className="product-detail-page">
        <div className="no-data">Ürün bulunamadı</div>
      </Container>
    )
  }

  const isNew = isNewProduct(product.createdAt)
  const categoryLabel =
    CATEGORY_LABELS[product.productCategory] || product.productCategory

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: "1300px" }}
      className="product-detail-page"
    >
      <div className="breadcrumb">
        Home &gt;{" "}
        <NavLink to={`/products/${product.productCategory}`}>
          {categoryLabel}
        </NavLink>
        &gt;{" "}
        <NavLink to={`/products/brand/${product.productBrand}`}>
          {product.productBrand}
        </NavLink>
        &gt; <b>{product.productName}</b>
      </div>

      <div className="pdp-grid">
        <div className="pdp-image">
          {isNew && <span className="badge-new">NEW</span>}
          <img src={product.productImages[0]} alt={product.productName} />
        </div>

        <div className="pdp-info">
          <Typography className="pdp-eyebrow">
            {product.productBrand}
          </Typography>
          <Typography className="pdp-title">{product.productName}</Typography>
          <Typography className="pdp-price">
            <span className="currency">$</span>
            {product.productPrice.toLocaleString()}
          </Typography>

          {product.productSpecs &&
            Object.keys(product.productSpecs).length > 0 && (
              <div className="keyfeatures">
                <h4>Key Features</h4>
                <ul>
                  {Object.entries(product.productSpecs).map(([key, value]) => (
                    <li key={key}>
                      <b>{key}:</b> {String(value)}
                    </li>
                  ))}
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
