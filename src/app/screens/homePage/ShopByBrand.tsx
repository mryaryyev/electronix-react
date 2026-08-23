import { Container, Stack, Box } from "@mui/material"
import { NavLink } from "react-router-dom"
import { ProductBrand } from "../../../libs/enums/product.enum"
import "../../../css/home/shopByBrand.css"

const BRAND_LOGOS: Record<ProductBrand, string> = {
  [ProductBrand.APPLE]: "/icons/apple-logo.svg",
  [ProductBrand.SAMSUNG]: "/icons/samsung-logo.svg",
  [ProductBrand.LENOVO]: "/icons/lenovo-logo.svg",
  [ProductBrand.ASUS]: "/icons/asus-logo.svg",
  [ProductBrand.XIAOMI]: "/icons/xiaomi-logo.svg",
  [ProductBrand.HUAWEI]: "/icons/huawei-logo.svg",
}

export default function ShopByBrand() {
  const brands = Object.values(ProductBrand)

  return (
    <Container className="shop-by-brand-section">
      <h2 className="shop-by-brand-title">Shop by Brand</h2>

      <Stack direction="row" spacing={4} className="brand-row">
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
