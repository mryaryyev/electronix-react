import { Container, Stack } from "@mui/material"
import ProductCard from "../../components/productCard"
import { mockProducts } from "../../components/mock/product.mock"
import { ProductBrand, ProductCategory } from "../../../libs/enums/product.enum"
import "../../../css/home/latestSamsung.css"

const LATEST_LIMIT = 5

export default function LatestSamsung() {
  const latest = [...mockProducts]
    .filter(
      p =>
        p.productBrand === ProductBrand.SAMSUNG &&
        p.productCategory === ProductCategory.SMARTPHONE,
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, LATEST_LIMIT)

  return (
    <Container className="samsung-section">
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
        className="samsung-section-header"
      >
        <h2 className="samsung-section-title">Latest Samsung Galaxy</h2>
      </Stack>

      <Stack direction="row" spacing={3} className="product-row">
        {latest.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Stack>
    </Container>
  )
}
