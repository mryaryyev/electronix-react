import { Link, Route, Routes } from "react-router-dom"
import "../css/app.css"
import { HomePage } from "./screens/homePage"
import { ProductsPage } from "./screens/productsPage"
import { OrdersPage } from "./screens/ordersPage"
import { UserPage } from "./screens/userPage"
import { HelpPage } from "./screens/helpPage"

export const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/products">ProductsPage</Link>
          </li>
          <li>
            <Link to="/orders">OrdersPage</Link>
          </li>
          <li>
            <Link to="/member-page">UserPage</Link>
          </li>
          <li>
            <Link to="/help">HelpPage</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}
