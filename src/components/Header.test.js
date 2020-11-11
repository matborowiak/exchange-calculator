import { render, screen } from '@testing-library/react'
import Header from './Header'

// render(<Header />)
test('renders header logo', () => {
  render(<Header />)
  const logo = screen.getByTestId('logo')
  expect(logo).toBeInTheDocument()
})

test('logo has alt text', () => {
  render(<Header />)
  const logoAlt = screen.getAllByAltText(/.*/)
  expect(logoAlt).toBeDefined()
})
