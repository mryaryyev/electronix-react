import { Container, Stack } from "@mui/material"
import ProductCard from "../../components/productCard/ProductCard"
import "../../../css/home/latestIphones.css"

import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { retrieveLatestIphones } from "./selector"
import { Product } from "../../../libs/types/product"

/** REDUX SLICE & SELECTOR */
const latestIphonesRetriever = createSelector(
  retrieveLatestIphones,
  latestIphones => ({
    latestIphones,
  }),
)

export default function LatestIphones() {
  const { latestIphones } = useSelector(latestIphonesRetriever)

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
        {latestIphones.length !== 0 ? (
          latestIphones.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="no-data">Latest products are not available</div>
        )}
      </Stack>
    </Container>
  )
}
