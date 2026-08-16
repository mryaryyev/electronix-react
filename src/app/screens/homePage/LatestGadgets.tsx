import { Container, Stack } from "@mui/material"
import ProductCard from "../../components/productCard"
import { mockProducts } from "../../components/mock/product.mock"
import "../../../css/home/latestGadgets.css"

const LATEST_LIMIT = 5

export default function LatestGadgets() {
  const latest = [...mockProducts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, LATEST_LIMIT)

  return (
    <Container className="latest-section">
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
        className="latest-section-header"
      >
        <h2 className="latest-section-title">Latest Gadgets</h2>
      </Stack>

      <Stack direction="row" spacing={3} className="product-row">
        {latest.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Stack>
    </Container>
  )
}
