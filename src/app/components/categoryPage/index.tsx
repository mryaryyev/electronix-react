import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { Box, Container, InputBase, Slider, Stack } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import ProductCard from "../../components/productCard/ProductCard"
import ProductService from "../../services/ProductService"
import { Product, ProductInquiry } from "../../../libs/types/product"
import { ProductBrand, ProductCategory } from "../../../libs/enums/product.enum"
import "../../../css/categoryPage.css"

const PAGE_SIZE = 10
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

  const [products, setProducts] = useState<Product[]>([])
  const [sort, setSort] = useState<SortOption>("createdAt")
  const [search, setSearch] = useState(searchFromUrl)
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000])
  const [page, setPage] = useState(1)

  const pageTitle = brand
    ? BRAND_LABELS[brand] || brand
    : category
      ? CATEGORY_LABELS[category] || category
      : "Tüm Ürünler"

  useEffect(() => {
    const productService = new ProductService()

    const inquiry: ProductInquiry = {
      page,
      limit: PAGE_SIZE,
      order: sort,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }

    if (brand) {
      inquiry.productBrand = brand.toUpperCase() as ProductBrand
    } else if (category) {
      inquiry.productCategory = category.toUpperCase() as ProductCategory
    }

    if (search.trim()) {
      inquiry.search = search.trim()
    }

    productService
      .getProducts(inquiry)
      .then(data => setProducts(data))
      .catch(err => {
        console.log(err)
      })
  }, [category, brand, search, priceRange, sort, page])

  // filtre değişince sayfayı 1'e sıfırla
  useEffect(() => {
    setPage(1)
  }, [category, brand, search, priceRange, sort])

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
              }}
              min={0}
              max={3000}
              step={50}
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

      <div className="results-count">{products.length} products</div>

      <div className="product-grid">
        {products.length ? (
          products.map(p => <ProductCard key={p._id} product={p} />)
        ) : (
          <div className="no-data">No Products</div>
        )}
      </div>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        className="pagination"
      >
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          ←
        </button>
        <span className="page-num active">{page}</span>
        <button
          disabled={products.length < PAGE_SIZE}
          onClick={() => setPage(p => p + 1)}
        >
          →
        </button>
      </Stack>
    </Container>
  )
}