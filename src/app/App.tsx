import { useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./screens/homePage"
import ProductsPage from "./screens/productsPage"
import ChosenProduct from "./screens/productsPage/ChosenProduct"
import OrdersPage from "./screens/ordersPage"
import UserPage from "./screens/userPage"
import HelpPage from "./screens/helpPage"
import Navbar from "./components/header/Navbar"
import Footer from "./components/footer/Footer"
import ScrollToTop from "./components/ScrollToTop"
import AuthenticationModal from "./components/auth"
import { sweetErrorHandling, sweetTopSuccessAlert } from "../libs/sweetAlert"
import { Messages } from "../libs/config"
import MemberService from "./services/MemberService"
import { useGlobals } from "./hooks/useGlobals"
import "../css/app.css"

function App() {
  const location = useLocation()
  const { setAuthMember } = useGlobals()
  const [signupOpen, setSignupOpen] = useState<boolean>(false)
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  /** HANDLERS */

  const handleSignupClose = () => {
    setSignupOpen(false)
  }
  const handleLoginClose = () => {
    setLoginOpen(false)
  }

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseLogout = () => {
    setAnchorEl(null)
  }
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService()
      await member.logout()

      await sweetTopSuccessAlert("success", 700)
      setAuthMember(null)
    } catch (err) {
      console.log(err)
      sweetErrorHandling(err)
    }
  }

  return (
    <>
      <ScrollToTop />
      <Navbar
        setSignupOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
      />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:category" element={<ProductsPage />} />
        <Route path="/products/brand/:brand" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ChosenProduct />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
        setSignupOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
      />
    </>
  )
}

export default App
