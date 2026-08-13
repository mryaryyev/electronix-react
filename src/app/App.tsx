import { Link, Route, Routes } from "react-router-dom"
import { About } from "./screens/About"
import { Users } from "./screens/Users"
import "../css/app.css"
import { Container } from "@mui/material"

export const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

function Home() {
  return <Container>Home</Container>
}
