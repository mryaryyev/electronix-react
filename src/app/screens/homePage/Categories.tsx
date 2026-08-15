import { Container, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import { categoryNavItems } from "../../components/mock/navbar.mock"
import "../../../css/home/categories.css"

export default function Categories() {
  return (
    <Container className="categories-section">
      <Stack direction="row" spacing={4} className="tile-grid">
        {categoryNavItems.map(item => (
          <NavLink
            key={item.label}
            to={`/products/${item.category}`}
            className="tile"
          >
            <div
              className="tile-inner"
              style={{ backgroundImage: `url(${item.subItems[0]?.image})` }}
            />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </Stack>
    </Container>
  )
}
