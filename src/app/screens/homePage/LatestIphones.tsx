import { Container, Stack } from "@mui/material"
import ProductCard from "../../components/productCard"
import { mockProducts } from "../../components/mock/product.mock"
import { ProductBrand, ProductCategory } from "../../../libs/enums/product.enum"
import "../../../css/home/latestIphones.css"

const LATEST_LIMIT = 5

export default function LatestIphones() {
  const latest = [...mockProducts]
    .filter(
      (p) =>
        p.productBrand === ProductBrand.APPLE &&
        p.productCategory === ProductCategory.SMARTPHONE,
    )
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, LATEST_LIMIT)

  return (
    <Container className="iphones-section">
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
        className="iphones-section-header"
      >
        <h2 className="iphones-section-title">Latest iPhones</h2>
      </Stack>

      <Stack direction="row" spacing={3} className="product-row">
        {latest.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Stack>
    </Container>
  )
}