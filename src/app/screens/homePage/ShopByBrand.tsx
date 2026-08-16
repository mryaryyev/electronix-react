import { Container, Stack, Box } from "@mui/material"
import { NavLink } from "react-router-dom"
import { ProductBrand } from "../../../libs/enums/product.enum"
import "../../../css/home/shopByBrand.css"

const BRAND_LOGOS: Record<ProductBrand, string> = {
  [ProductBrand.APPLE]: "/icons/samsung-logo.webp",
  [ProductBrand.SAMSUNG]: "/icons/samsung-logo.webp",
  [ProductBrand.LENOVO]: "/icons/samsung-logo.webp",
  [ProductBrand.ASUS]: "/icons/samsung-logo.webp",
  [ProductBrand.XIAOMI]: "/icons/samsung-logo.webp",
  [ProductBrand.HUAWEI]: "/icons/samsung-logo.webp",
}

export default function ShopByBrand() {
  const brands = Object.values(ProductBrand)

  return (
    <Container className="shop-by-brand-section">
      <h2 className="shop-by-brand-title">Shop by Brand</h2>

      <Stack direction="row" spacing={2} className="brand-row">
        {brands.map(brand => (
          <NavLink
            key={brand}
            to={`/products/brand/${brand}`}
            className="brand-card"
          >
            <Box
              component="img"
              src={BRAND_LOGOS[brand]}
              alt={brand}
              className="brand-logo"
            />
          </NavLink>
        ))}
      </Stack>
    </Container>
  )
}
