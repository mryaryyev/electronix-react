import { Box, Container, Stack } from "@mui/material"
import "../../../css/footer.css"

const categories = [
  "Smartphones",
  "Laptops",
  "Audio",
  "Cameras",
  "Gaming Consoles",
  "Accessories",
  "Wearables",
  "Adapters & Cables",
]

const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "JBL",
  "Bose",
  "Lenovo",
  "HP",
  "Google",
]

export default function Footer() {
  return (
    <div className="footer">
      <Container className={"footer-frame"}>
        <Stack className={"footer-top"} direction={"row"}>
          <Stack className={"footer-col footer-brand"}>
            <Box className={"footer-logo"}>ELECTRONIX</Box>
            <Box className={"footer-desc"}>
              Your trusted destination for premium electronics. Shop with
              confidence.
            </Box>

            <Stack className={"footer-contact-card"}>
              <Stack className={"contact-row"} direction={"row"}>
                <img src={"/icons/location.svg"} alt="" />
                <Box>123 Main Street, Suite 4, Chicago, IL</Box>
              </Stack>
              <Stack className={"contact-row"} direction={"row"}>
                <img src={"/icons/calendar.svg"} alt="" />
                <Box>Mon – Sat: 9:00 AM – 8:00 PM</Box>
              </Stack>
              <Stack className={"contact-row"} direction={"row"}>
                <img src={"/icons/speaker.svg"} alt="" />
                <Box>support@electronix.com</Box>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"footer-col"}>
            <Box className={"footer-col-title"}>Categories</Box>
            <Stack className={"footer-links"}>
              {categories.map(item => (
                <Box key={item} component="a" href="#">
                  {item}
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack className={"footer-col"}>
            <Box className={"footer-col-title"}>Brands</Box>
            <Stack className={"footer-links"}>
              {brands.map(item => (
                <Box key={item} component="a" href="#">
                  {item}
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Box className={"footer-divider"} />

        <Stack className={"footer-bottom"} direction={"row"}>
          <Box className={"footer-copyright"}>
            © {new Date().getFullYear()} Electronix. All rights reserved.
          </Box>

          <Box className={"footer-copyright"}>Designed by: MIT-RYAN.</Box>

          <Stack className={"footer-socials"} direction={"row"}>
            <Box
              component="a"
              href="#"
              className={"social-icon"}
              aria-label="Instagram"
            >
              <img src={"/icons/instagram.svg"} alt="" />
            </Box>
            <Box
              component="a"
              href="#"
              className={"social-icon"}
              aria-label="Twitter"
            >
              <img src={"/icons/twitter.svg"} alt="" />
            </Box>
            <Box
              component="a"
              href="#"
              className={"social-icon"}
              aria-label="Facebook"
            >
              <img src={"/icons/facebook.svg"} alt="" />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
