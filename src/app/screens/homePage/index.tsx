import Advertisement from "./Advertisement"
import Categories from "./Categories"
import Events from "./Events"
import LatestGadgets from "./LatestGadgets"
import LatestIphones from "./LatestIphones"
import LatestSamsung from "./LatestSamsung"
import ShopByBrand from "./ShopByBrand"
import TrendingGadgets from "./TrendingGadgets"

export default function HomePage() {
  return (
    <div className="homepage">
      <Categories />
      <TrendingGadgets />
      <LatestGadgets />
      <LatestIphones />
      <LatestSamsung />
      <ShopByBrand />
      <Advertisement />
      <Events />
    </div>
  )
}
