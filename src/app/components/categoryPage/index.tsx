import { useMemo, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { Box, Container, InputBase, Slider, Stack } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import {
  mockProducts,
  categorySubGroups,
} from "../../components/mock/product.mock"
import ProductCard from "../../components/productCard"
import "../../../css/categoryPage.css"

const PAGE_SIZE = 4
type SortOption = "createdAt" | "productPrice" | "productViews"

const CATEGORY_LABELS: Record<string, string> = {
  SMARTPHONE: "Smartphones",
  LAPTOP: "Laptops",
  TABLET: "Tablets",
  SMARTWATCH: "Smartwatch",
  CAMERA: "Cameras",
  ACCESSORY: "Accessories",
}

const BRAND_LABELS: Record<string, string> = {
  APPLE: "Apple",
  SAMSUNG: "Samsung",
  LENOVO: "Lenovo",
  ASUS: "Asus",
  XIAOMI: "Xiaomi",
  HUAWEI: "Huawei",
}

export default function CategoryPage() {
  const { category, brand } = useParams()
  const [searchParams] = useSearchParams()
  const searchFromUrl = searchParams.get("search") || ""

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOption>("createdAt")
  const [search, setSearch] = useState(searchFromUrl)
  const [priceRange, setPriceRange] = useState<number[]>([98000, 300000])
  const [page, setPage] = useState(1)

  const pageTitle = brand
    ? BRAND_LABELS[brand] || brand
    : category
      ? CATEGORY_LABELS[category] || category
      : "Tüm Ürünler"

  const filtered = useMemo(() => {
    let list = mockProducts

    if (brand) {
      list = list.filter(p => p.productBrand === brand)
    } else if (category) {
      list = list.filter(p => p.productCategory === category)
      if (selectedBrand) {
        list = list.filter(p => p.productBrand === selectedBrand)
      }
    }

    if (search.trim()) {
      list = list.filter(p =>
        p.productName.toLowerCase().includes(search.trim().toLowerCase()),
      )
    }

    const [min, max] = priceRange
    list = list.filter(p => p.productPrice >= min && p.productPrice <= max)

    list = [...list].sort((a, b) => {
      if (sort === "productPrice") return a.productPrice - b.productPrice
      if (sort === "productViews") return b.productViews - a.productViews
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return list
  }, [category, brand, selectedBrand, search, priceRange, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: "1300px" }}
      className="category-page"
    >
      <div className="breadcrumb">
        Home &gt; <b>{pageTitle}</b>
      </div>
      <h1 className="page-title">{pageTitle}</h1>

      {!brand &&
        category &&
        categorySubGroups[category as keyof typeof categorySubGroups] && (
          <Stack direction="row" spacing={3} className="sub-strip">
            {categorySubGroups[category as keyof typeof categorySubGroups]!.map(
              group => (
                <Box
                  key={group.label}
                  className={`sub-item ${selectedBrand === group.brand ? "active" : ""}`}
                  onClick={() =>
                    setSelectedBrand(
                      selectedBrand === group.brand ? null : group.brand,
                    )
                  }
                >
                  <div
                    className="thumb"
                    style={{ backgroundImage: `url(${group.image})` }}
                  />
                  <div className="label">{group.label}</div>
                </Box>
              ),
            )}
          </Stack>
        )}

      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        className="toolbar-row"
      >
        <div className="filters">
          <div className="group">
            <div className="group-title">Price Range</div>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => {
                setPriceRange(newValue as number[])
                setPage(1)
              }}
              min={0}
              max={350000}
              step={5000}
              size="small"
              valueLabelDisplay="auto"
              sx={{ color: "#6ea87f" }}
            />
            <div className="price-range-labels">
              <span>$ {priceRange[0].toLocaleString()}</span>
              <span>$ {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Stack spacing={2} sx={{ flex: 1 }}>
          <Box className="search-row">
            <SearchIcon fontSize="small" sx={{ color: "#888" }} />
            <InputBase
              placeholder="Type here"
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                setPage(1)
              }}
              fullWidth
              sx={{ fontSize: 14, ml: 1 }}
            />
          </Box>

          <Stack direction="row" spacing={1.5} className="sort-row">
            {(
              ["createdAt", "productPrice", "productViews"] as SortOption[]
            ).map(opt => (
              <button
                key={opt}
                className={`sort-pill ${sort === opt ? "active" : ""}`}
                onClick={() => setSort(opt)}
              >
                {opt === "createdAt"
                  ? "NEW"
                  : opt === "productPrice"
                    ? "PRICE"
                    : "VIEWS"}
              </button>
            ))}
          </Stack>
        </Stack>
      </Stack>

      <div className="results-count">{filtered.length} products</div>

      <div className="product-grid">
        {pageItems.length ? (
          pageItems.map(p => <ProductCard key={p._id} product={p} />)
        ) : (
          <div className="no-data">No Products</div>
        )}
      </div>

      {totalPages > 1 && (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          className="pagination"
        >
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              className={`page-num ${page === n ? "active" : ""}`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            →
          </button>
        </Stack>
      )}
    </Container>
  )
}
