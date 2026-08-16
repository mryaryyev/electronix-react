import { Container, Stack } from "@mui/material"
import ProductCard from "../../components/productCard"
import { mockProducts } from "../../components/mock/product.mock"
import "../../../css/home/trendingGadgets.css"

const TRENDING_LIMIT = 5

export default function TrendingGadgets() {
  const trending = [...mockProducts]
    .sort((a, b) => b.productViews - a.productViews)
    .slice(0, TRENDING_LIMIT)

  return (
    <Container className="trending-section">
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
        className="section-header"
      >
        <h2 className="trending-section-title">Trending Gadgets</h2>
      </Stack>

      <Stack direction="row" spacing={3} className="product-row">
        {trending.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Stack>
    </Container>
  )
}
