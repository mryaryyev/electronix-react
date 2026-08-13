import { screen } from "@testing-library/react"
import { App } from "./App"
import { renderWithProviders } from "../utils/test-utils"

test("App should render HOME text", () => {
  renderWithProviders(<App />)

  expect(screen.getByText("HOME")).toBeInTheDocument()
})
