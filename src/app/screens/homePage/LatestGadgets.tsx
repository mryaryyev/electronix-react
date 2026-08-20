import { Container, Stack } from "@mui/material"
import ProductCard from "../../components/productCard/ProductCard"
import "../../../css/home/latestGadgets.css"

import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { retrieveLatestGadgets } from "./selector"
import { Product } from "../../../libs/types/product"

/** REDUX SLICE & SELECTOR */
const latestGadgetsRetriever = createSelector(
  retrieveLatestGadgets,
  latestGadgets => ({ latestGadgets }),
)

export default function LatestGadgets() {
  const { latestGadgets } = useSelector(latestGadgetsRetriever)

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
        {latestGadgets.length !== 0 ? (
          latestGadgets.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="no-data">Latest products are not available</div>
        )}
      </Stack>
    </Container>
  )
}
