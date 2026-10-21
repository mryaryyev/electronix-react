import { useEffect, useState } from 'react'
import { Box, Container, InputBase, Stack, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { Search as SearchIcon, PersonOutlined as PersonOutlineIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { categoryNavItems } from '../mock/navbar.mock'
import { useGlobals } from '../../hooks/useGlobals'
import { serverApi } from '../../../libs/config'
import Basket from './Basket'
import '../../../css/navbar.css'
import { ProductBrand } from '../../../libs/enums/product.enum'
import { T } from '../../../libs/types/common'

interface NavbarProps {
  setSignupOpen: (isOpen: boolean) => void
  setLoginOpen: (isOpen: boolean) => void
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void
  anchorEl: HTMLElement | null
  handleCloseLogout: () => void
  handleLogoutRequest: () => Promise<void>
}

export default function Navbar(props: NavbarProps) {
  const { setLoginOpen, handleLogoutClick, anchorEl, handleCloseLogout, handleLogoutRequest } = props

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { authMember } = useGlobals()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setSearchText(searchParams.get('search') || '')
  }, [location.search, searchParams])

  const searchHandler = () => {
    if (!searchText.trim()) return
    navigate(`/products?search=${searchText.trim()}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)
    if (value === '') {
      navigate('/products')
    }
  }

  const activeDropdown = categoryNavItems.find(item => item.label === hoveredCategory)

  const [displayedDropdown, setDisplayedDropdown] = useState(activeDropdown)
  useEffect(() => {
    if (activeDropdown) {
      setDisplayedDropdown(activeDropdown)
    }
  }, [activeDropdown])

  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null)

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMenuPosition({ top: rect.bottom + 8, left: rect.right })
    handleLogoutClick(e)
  }

  return (
    <div className="navbar">
      <Container>
        <Stack
          className="navbar-top"
          direction="row"
          spacing={3}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <NavLink to="/" className="logo">
            <img src="/icons/MIT_logo.svg" alt="" />
            Electronix
          </NavLink>

          <Box className="search-bar">
            <SearchIcon sx={{ color: '#888', cursor: 'pointer' }} onClick={searchHandler} />
            <InputBase
              placeholder="Search for gadgets..."
              value={searchText}
              onChange={handleSearchChange}
              onKeyDown={e => {
                if (e.key === 'Enter') searchHandler()
              }}
              fullWidth
              sx={{ fontSize: 15, ml: 2 }}
            />
          </Box>

          <Stack direction="row" sx={{ alignItems: 'center' }} spacing={4} className="navbar-right">
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <NavLink to="/help" className="help">
                <div className="text">HELP CENTER</div>
                <div className="num">010 9797 2777</div>
              </NavLink>
              <img src="/icons/KakaoTalk.webp" alt="KakaoTalk" width={28} height={28} />
            </Stack>

            <Basket />

            {authMember && (
              <NavLink to="/orders" className="orders-link">
                My Orders
              </NavLink>
            )}

            {!authMember ? (
              <PersonOutlineIcon
                className="icon-btn"
                onClick={() => {
                  setLoginOpen(true)
                }}
                sx={{ cursor: 'pointer' }}
              />
            ) : (
              <>
                <Box
                  className="avatar-dot"
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setMenuPosition({ top: rect.bottom + 8, left: rect.right })
                    handleLogoutClick(e)
                  }}
                  aria-haspopup="true"
                >
                  {authMember.memberImage ? (
                    <img src={`${serverApi}/${authMember.memberImage}`} alt="" />
                  ) : (
                    authMember.memberNick
                      .split(' ')
                      .map(w => w[0])
                      .join('')
                  )}
                </Box>
                <Menu
                  open={Boolean(anchorEl)}
                  onClose={handleCloseLogout}
                  anchorReference="anchorPosition"
                  anchorPosition={menuPosition ?? { top: 0, left: 0 }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseLogout()
                      navigate('/member-page')
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseLogout()
                      void handleLogoutRequest()
                    }}
                  >
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
                <NavLink to={`/products/${item.category}`}>{item.label}</NavLink>
              </Box>
            ))}
          </Stack>
        </Container>

        <Container>
          <Stack direction="row" spacing={6} className={`dropdown-panel ${activeDropdown ? 'open' : 'closed'}`}>
            {displayedDropdown && (
              <>
                <Box className="dropdown-title-block">
                  <div className="dropdown-title">{displayedDropdown.label}</div>
                  <NavLink to={`/products/${displayedDropdown.category}`} className="dropdown-shopall">
                    See all {displayedDropdown.label} →
                  </NavLink>
                </Box>

                <div className="dropdown-divider" />

                <Stack direction="row" spacing={6} className="dropdown-items">
                  {displayedDropdown.subItems.map(sub => (
                    <NavLink
                      key={sub.label}
                      to={`/products/${displayedDropdown.category}?brand=${sub.brand}`}
                      className="dropdown-item"
                    >
                      <div className="thumb">
                        <div
                          className="thumb-inner"
                          style={{
                            backgroundImage: `url(${sub.image})`,
                            backgroundSize: sub.thumbSize ?? 'contain',
                          }}
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
