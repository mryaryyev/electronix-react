import { Route, Routes, useLocation } from "react-router-dom"
import "../css/app.css"
import { HomePage } from "./screens/homePage"
import { ProductsPage } from "./screens/productsPage"
import { OrdersPage } from "./screens/ordersPage"
import { UserPage } from "./screens/userPage"
import { HelpPage } from "./screens/helpPage"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

function App() {
  const location = useLocation()
  console.log(location)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
