import { useEffect, useRef, useState, ChangeEvent } from 'react'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'
import { Container, InputBase, Slider, Stack, Box } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import ProductCard from '../../components/productCard/ProductCard'
import ProductService from '../../services/ProductService'
import { setProducts } from './slice'
import { retrieveProducts } from './selector'
import { Product, ProductInquiry } from '../../../libs/types/product'
import { ProductBrand, ProductCategory } from '../../../libs/enums/product.enum'
import { formatBrandOrCategory } from '../../../libs/utils/product.utils'
import '../../../css/productsPage.css'

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
})
const productsRetriever = createSelector(retrieveProducts, products => ({
  products,
}))

export default function ProductsPage() {
  const { category, brand } = useParams()
  const [searchParams] = useSearchParams()
  const searchFromUrl = searchParams.get('search') || ''
  const brandFromQuery = searchParams.get('brand') || ''
  const effectiveBrand = brand || brandFromQuery

  const { setProducts } = actionDispatch(useDispatch())
  const { products } = useSelector(productsRetriever)

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 10,
    order: 'createdAt',
    search: searchFromUrl,
    minPrice: 0,
    maxPrice: 3000,
    ...(effectiveBrand ? { productBrand: effectiveBrand.toUpperCase() as ProductBrand } : {}),
    ...(category ? { productCategory: category.toUpperCase() as ProductCategory } : {}),
  })
  const [searchText, setSearchText] = useState(searchFromUrl)
  const [availableBrands, setAvailableBrands] = useState<string[]>([])

  const isFirstRender = useRef(true)

  const pageTitle = brand ? formatBrandOrCategory(brand) : category ? formatBrandOrCategory(category) : 'All Products'

  // asıl veri çekme — productSearch her değiştiğinde
  useEffect(() => {
    const productService = new ProductService()
    productService
      .getProducts(productSearch)
      .then(data => {
        setProducts(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [productSearch])

  // category/brand/arama URL'den değişirse senkron ol
  // (ilk mount'ta çalışmasın diye ref ile atlatıyoruz, çünkü başlangıç state'i zaten doğru kuruldu)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const urlSearch = searchParams.get('search') || ''
    const urlBrandQuery = searchParams.get('brand') || ''
    const currentBrand = brand || urlBrandQuery

    setSearchText(urlSearch)
    setProductSearch(prev => ({
      ...prev,
      page: 1,
      search: urlSearch,
      productBrand: currentBrand ? (currentBrand.toUpperCase() as ProductBrand) : undefined,
      productCategory: category ? (category.toUpperCase() as ProductCategory) : undefined,
    }))
  }, [category, brand, searchParams])

  // kategori sayfasındaysa, o kategoride gerçekten satılan markaları backend'den öğren
  useEffect(() => {
    if (!brand && category) {
      const productService = new ProductService()
      productService
        .getProducts({
          page: 1,
          limit: 100,
          order: 'createdAt',
          productCategory: category.toUpperCase() as ProductCategory,
        })
        .then(data => {
          const uniqueBrands: string[] = []
          data.forEach(p => {
            if (!uniqueBrands.includes(p.productBrand)) {
              uniqueBrands.push(p.productBrand)
            }
          })
          setAvailableBrands(uniqueBrands)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setAvailableBrands([])
    }
  }, [category, brand])

  /** HANDLERS */

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1
    productSearch.order = order
    setProductSearch({ ...productSearch })
  }

  const searchBrandHandler = (b: ProductBrand | null) => {
    productSearch.page = 1
    productSearch.productBrand = b ?? undefined
    setProductSearch({ ...productSearch })
  }

  const priceRangeHandler = (range: number[]) => {
    productSearch.page = 1
    productSearch.minPrice = range[0]
    productSearch.maxPrice = range[1]
    setProductSearch({ ...productSearch })
  }

  const searchProductHandler = () => {
    productSearch.page = 1
    productSearch.search = searchText
    setProductSearch({ ...productSearch })
  }

  const paginationHandler = (_: ChangeEvent<unknown>, value: number) => {
    productSearch.page = value
    setProductSearch({ ...productSearch })
  }

  return (
    <Container className="category-page">
      <div className="breadcrumb">
        <NavLink to="/">Home</NavLink> &gt; <b>{pageTitle}</b>
      </div>
      <h1 className="page-title">{pageTitle}</h1>

      {availableBrands.length > 0 && (
        <Stack direction="row" spacing={1.5} className="brand-filter-row">
          <button
            className={`brand-pill ${!productSearch.productBrand ? 'active' : ''}`}
            onClick={() => {
              searchBrandHandler(null)
            }}
          >
            All
          </button>
          {availableBrands.map(b => (
            <button
              key={b}
              className={`brand-pill ${productSearch.productBrand === b ? 'active' : ''}`}
              onClick={() => {
                searchBrandHandler(b as ProductBrand)
              }}
            >
              {formatBrandOrCategory(b)}
            </button>
          ))}
        </Stack>
      )}

      <Stack direction="row" spacing={2} alignItems="flex-start" className="toolbar-row">
        <div className="filters">
          <div className="group">
            <div className="group-title">Price Range</div>
            <Slider
              value={[productSearch.minPrice ?? 0, productSearch.maxPrice ?? 3000]}
              onChange={(_, newValue) => {
                priceRangeHandler(newValue)
              }}
              min={0}
              max={3000}
              step={50}
              size="small"
              valueLabelDisplay="auto"
              sx={{ color: '#6ea87f' }}
            />
            <div className="price-range-labels">
              <span>$ {(productSearch.minPrice ?? 0).toLocaleString()}</span>
              <span>$ {(productSearch.maxPrice ?? 3000).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Stack spacing={2} sx={{ flex: 1 }}>
          <Box className="search-row">
            <SearchIcon fontSize="small" sx={{ color: '#888' }} />
            <InputBase
              placeholder="Type here"
              value={searchText}
              onChange={e => {
                setSearchText(e.target.value)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') searchProductHandler()
              }}
              fullWidth
              sx={{ fontSize: 14, ml: 1 }}
            />
          </Box>

          <Stack direction="row" spacing={1.5} className="sort-row">
            {['createdAt', 'productPrice', 'productViews'].map(opt => (
              <button
                key={opt}
                className={`sort-pill ${productSearch.order === opt ? 'active' : ''}`}
                onClick={() => {
                  searchOrderHandler(opt)
                }}
              >
                {opt === 'createdAt' ? 'NEW' : opt === 'productPrice' ? 'PRICE' : 'VIEWS'}
              </button>
            ))}
          </Stack>
        </Stack>
      </Stack>

      <div className="results-count">{products.length} products</div>

      <div className="product-grid">
        {products.length ? (
          products.map((p: Product) => <ProductCard key={p._id} product={p} />)
        ) : (
          <div className="no-data">No Products</div>
        )}
      </div>

      <Stack direction="row" justifyContent="center" className="pagination">
        <Pagination
          count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
          page={productSearch.page}
          onChange={paginationHandler}
          className="custom-pagination"
          renderItem={item => (
            <PaginationItem
              components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </Container>
  )
}
