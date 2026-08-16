import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Product } from "../../../libs/types/product"
import "../../../css/productCard.css"

const NEW_THRESHOLD_DAYS = 14

function isNewProduct(createdAt: Date): boolean {
  const diffMs = Date.now() - new Date(createdAt).getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays <= NEW_THRESHOLD_DAYS
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew = isNewProduct(product.createdAt)

  return (
    <NavLink to={`/product/${product._id}`} className="card-link">
      <Card className="card">
        <div className="thumb-wrap">
          {isNew && <div className="product-sale">NEW</div>}
          <CardMedia
            component="img"
            image={product.productImages[0]}
            className="thumb-img"
          />
        </div>

        <CardContent className="product-detail">
          <Typography
            sx={{
              fontSize: 14,
              color: "#6b7280",
              mb: 0.75,
              textTransform: "lowercase",
              "&::first-letter": { textTransform: "uppercase" },
            }}
          >
            {product.productBrand}
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 600,
              color: "#14161a",
              mb: 0.5,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.productName}
          </Typography>

          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography
              sx={{ fontSize: 15, fontWeight: 500, color: "#8b8f98" }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#8b8f98",
                  marginRight: 2,
                }}
              >
                $
              </span>
              {product.productPrice.toLocaleString()}
            </Typography>

            <Stack
              direction="row"
              sx={{ alignItems: "center", gap: 0.5, color: "#8b8f98" }}
            >
              <Typography sx={{ fontSize: 13 }}>
                {product.productViews}
              </Typography>
              <VisibilityIcon sx={{ fontSize: 16 }} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </NavLink>
  )
}
