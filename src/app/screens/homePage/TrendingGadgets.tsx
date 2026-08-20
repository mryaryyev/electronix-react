import { Container, Stack } from "@mui/material"
import ProductCard from "../../components/productCard/ProductCard"
import "../../../css/home/trendingGadgets.css"

import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { retrieveTrendingGadgets } from "./selector"
import { Product } from "../../../libs/types/product"

/** REDUX SLICE & SELECTOR */
const trendingGadgetsRetriever = createSelector(
  retrieveTrendingGadgets,
  trendingGadgets => ({ trendingGadgets }),
)

export default function TrendingGadgets() {
  const { trendingGadgets } = useSelector(trendingGadgetsRetriever)

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
        {trendingGadgets.length !== 0 ? (
          trendingGadgets.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="no-data">Trending products are not available</div>
        )}
      </Stack>
    </Container>
  )
}
