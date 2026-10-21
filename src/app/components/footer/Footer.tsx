import { Box, Container, Stack } from '@mui/material'
import '../../../css/footer.css'
import { NavLink } from 'react-router-dom'
import { formatBrandOrCategory } from '../../../libs/utils/product.utils'
import { ProductBrand, ProductCategory } from '../../../libs/enums/product.enum'

const categories = Object.values(ProductCategory)
const brands = Object.values(ProductBrand)

export default function Footer() {
  return (
    <div className="footer">
      <Container className={'footer-frame'}>
        <Stack className={'footer-top'} direction={'row'}>
          <Stack className={'footer-col footer-brand'}>
            <Box className={'footer-logo'}>ELECTRONIX</Box>
            <Box className={'footer-desc'}>Your trusted destination for premium electronics. Shop with confidence.</Box>

            <Stack className={'footer-contact-card'}>
              <Stack className={'contact-row'} direction={'row'}>
                <img src={'/icons/location.svg'} alt="" />
                <Box>77 Massachusetts Avenue, Cambridge, MA</Box>
              </Stack>
              <Stack className={'contact-row'} direction={'row'}>
                <img src={'/icons/calendar.svg'} alt="" />
                <Box>Mon – Sat: 9:00 AM – 8:00 PM</Box>
              </Stack>
              <Stack className={'contact-row'} direction={'row'}>
                <img src={'/icons/speaker.svg'} alt="" />
                <Box>support@electronix.com</Box>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={'footer-col'}>
            <Box className={'footer-col-title'}>Categories</Box>
            <Stack className={'footer-links'}>
              {categories.map(item => (
                <NavLink key={item} to={`/products/${item}`}>
                  {formatBrandOrCategory(item)}
                </NavLink>
              ))}
            </Stack>
          </Stack>

          <Stack className={'footer-col'}>
            <Box className={'footer-col-title'}>Brands</Box>
            <Stack className={'footer-links'}>
              {brands.map(item => (
                <NavLink key={item} to={`/products/brand/${item}`}>
                  {formatBrandOrCategory(item)}
                </NavLink>
              ))}
            </Stack>
          </Stack>

          <Stack className={'footer-col'}>
            <Box className={'footer-col-title'}>Support</Box>
            <Stack className={'footer-links'}>
              <NavLink to={'/help?tab=1'}>Terms</NavLink>
              <NavLink to={'/help?tab=2'}>FAQ</NavLink>
              <NavLink to={'/help?tab=3'}>Contact</NavLink>
            </Stack>
          </Stack>
        </Stack>

        <Box className={'footer-divider'} />

        <Stack className={'footer-bottom'} direction={'row'}>
          <Box className={'footer-copyright'}>© {new Date().getFullYear()} Electronix. All rights reserved.</Box>

          <Box className={'footer-copyright'}>Designed by: MIT-RYAN.</Box>

          <Stack className={'footer-socials'} direction={'row'}>
            <Box component="a" href="#" className={'social-icon'} aria-label="Instagram">
              <img src={'/icons/instagram.svg'} alt="" />
            </Box>
            <Box component="a" href="#" className={'social-icon'} aria-label="Twitter">
              <img src={'/icons/twitter.svg'} alt="" />
            </Box>
            <Box component="a" href="#" className={'social-icon'} aria-label="Facebook">
              <img src={'/icons/facebook.svg'} alt="" />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
