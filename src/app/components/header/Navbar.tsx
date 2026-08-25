import { useEffect, useState } from "react"
import {
  Badge,
  Box,
  Container,
  InputBase,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material"
import {
  Search as SearchIcon,
  PersonOutlined as PersonOutlineIcon,
  Logout as LogoutIcon,
  BoltOutlined as BoltIcon,
} from "@mui/icons-material"
import {
  NavLink,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom"
import { categoryNavItems } from "../mock/navbar.mock"
import { useGlobals } from "../../hooks/useGlobals"
import { serverApi } from "../../../libs/config"
import Basket from "./Basket"
import "../../../css/navbar.css"

interface NavbarProps {
  setSignupOpen: (isOpen: boolean) => void
  setLoginOpen: (isOpen: boolean) => void
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void
  anchorEl: HTMLElement | null
  handleCloseLogout: () => void
  handleLogoutRequest: () => void
}

export default function Navbar(props: NavbarProps) {
  const {
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { authMember } = useGlobals()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    setSearchText(searchParams.get("search") || "")
  }, [location.search])

  const searchHandler = () => {
    if (!searchText.trim()) return
    navigate(`/products?search=${searchText.trim()}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)
    if (value === "") {
      navigate("/products")
    }
  }

  const activeDropdown = categoryNavItems.find(
    item => item.label === hoveredCategory,
  )

  const [displayedDropdown, setDisplayedDropdown] = useState(activeDropdown)
  useEffect(() => {
    if (activeDropdown) {
      setDisplayedDropdown(activeDropdown)
    }
  }, [activeDropdown])

  return (
    <div className="navbar">
      <Container>
        <Stack
          className="navbar-top"
          direction="row"
          spacing={3}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <NavLink to="/" className="logo">
          <img src="/icons/MIT_logo.svg" alt="" />
            Electronix
          </NavLink>

          <Box className="search-bar">
            <SearchIcon
              sx={{ color: "#888", cursor: "pointer" }}
              onClick={searchHandler}
            />
            <InputBase
              placeholder="Search for Smartphones, Laptops, Tablets..."
              value={searchText}
              onChange={handleSearchChange}
              onKeyDown={e => {
                if (e.key === "Enter") searchHandler()
              }}
              fullWidth
              sx={{ fontSize: 15, ml: 2 }}
            />
          </Box>

          <Stack
            direction="row"
            sx={{ alignItems: "center" }}
            spacing={4}
            className="navbar-right"
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Box className="help">
                <div className="text">NEED HELP?</div>
                <div className="num">010 9797 2777</div>
              </Box>
              <img
                src="/icons/KakaoTalk.webp"
                alt="KakaoTalk"
                width={28}
                height={28}
              />
              <Box>
                <NavLink to="/help" className="orders-link">
                  Help
                </NavLink>
              </Box>
            </Stack>

            <Basket />

            {authMember && (
              <NavLink to="/orders" className="orders-link">
                My
                <br />
                Orders
              </NavLink>
            )}

            {!authMember ? (
              <PersonOutlineIcon
                className="icon-btn"
                onClick={() => {
                  setLoginOpen(true)
                }}
                sx={{ cursor: "pointer" }}
              />
            ) : (
              <>
                <Box
                  className="avatar-dot"
                  onClick={handleLogoutClick}
                  aria-haspopup="true"
                >
                  {authMember.memberImage ? (
                    <img
                      src={`${serverApi}/${authMember.memberImage}`}
                      alt=""
                    />
                  ) : (
                    authMember.memberNick
                      .split(" ")
                      .map(w => w[0])
                      .join("")
                  )}
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseLogout}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseLogout()
                      navigate("/member-page")
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogoutRequest}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        </Stack>
      </Container>

      <div
        className="category-wrap"
        onMouseLeave={() => {
          setHoveredCategory(null)
        }}
      >
        <Container>
          <Stack direction="row" className="category-bar">
            {categoryNavItems.map(item => (
              <Box
                key={item.label}
                className="category-item"
                onMouseEnter={() => {
                  setHoveredCategory(item.label)
                }}
              >
                <NavLink to={`/products/${item.category}`}>
                  {item.label}
                </NavLink>
              </Box>
            ))}
          </Stack>
        </Container>

        <Container>
          <Stack
            direction="row"
            spacing={6}
            className={`dropdown-panel ${activeDropdown ? "open" : "closed"}`}
          >
            {displayedDropdown && (
              <>
                <Box className="dropdown-title-block">
                  <div className="dropdown-title">
                    {displayedDropdown.label}
                  </div>
                  <NavLink
                    to={`/products/${displayedDropdown.category}`}
                    className="dropdown-shopall"
                  >
                    See all {displayedDropdown.label} →
                  </NavLink>
                </Box>

                <div className="dropdown-divider" />

                <Stack direction="row" spacing={6} className="dropdown-items">
                  {displayedDropdown.subItems.map(sub => (
                    <NavLink
                      key={sub.label}
                      to={`/products/brand/${sub.brand}`}
                      className="dropdown-item"
                    >
                      <div className="thumb">
                        <div
                          className="thumb-inner"
                          style={{ backgroundImage: `url(${sub.image})` }}
                        />
                      </div>
                      <div className="label">{sub.label}</div>
                    </NavLink>
                  ))}
                </Stack>
              </>
            )}
          </Stack>
        </Container>
      </div>
    </div>
  )
}
