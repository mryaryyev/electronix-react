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
  ShoppingCartOutlined as CartIcon,
  Logout as LogoutIcon,
  BoltOutlined as BoltIcon,
} from "@mui/icons-material"
import { NavLink, useNavigate } from "react-router-dom"
import { categoryNavItems } from "../mock/navbar.mock"
import "../../../css/navbar.css"

const MOCK_MEMBER = {
  memberNick: "Electronix",
  memberImage: undefined as string | undefined,
}

const CART_ITEM_COUNT = 1

export default function Navbar() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleMenuClose = () => setAnchorEl(null)
  const handleLogout = () => {
    setIsAuthenticated(false)
    setAnchorEl(null)
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
            <BoltIcon sx={{ fontSize: 24 }} />
            Electronix
          </NavLink>

          <Box className="search-bar">
            <SearchIcon sx={{ color: "#888" }} />
            <InputBase
              placeholder="Search for Smartphones, Laptops, Tablets..."
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

            <Badge badgeContent={CART_ITEM_COUNT} color="error">
              <CartIcon className="icon-btn" sx={{ cursor: "pointer" }} />
            </Badge>

            {isAuthenticated && (
              <NavLink to="/orders" className="orders-link">
                My
                <br />
                Orders
              </NavLink>
            )}

            {!isAuthenticated ? (
              <PersonOutlineIcon
                className="icon-btn"
                onClick={() => setIsAuthenticated(true)}
                sx={{ cursor: "pointer" }}
              />
            ) : (
              <>
                <Box
                  className="avatar-dot"
                  onClick={handleAvatarClick}
                  aria-haspopup="true"
                >
                  {MOCK_MEMBER.memberImage ? (
                    <img src={MOCK_MEMBER.memberImage} alt="" />
                  ) : (
                    MOCK_MEMBER.memberNick
                      .split(" ")
                      .map(w => w[0])
                      .join("")
                  )}
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose()
                      navigate("/member-page")
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
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
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <Container>
          <Stack direction="row" className="category-bar">
            {categoryNavItems.map(item => (
              <Box
                key={item.label}
                className="category-item"
                onMouseEnter={() => setHoveredCategory(item.label)}
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
                    <Box key={sub.label} className="dropdown-item">
                      <div className="thumb">
                        <div
                          className="thumb-inner"
                          style={{ backgroundImage: `url(${sub.image})` }}
                        />
                      </div>
                      <div className="label">{sub.label}</div>
                    </Box>
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
