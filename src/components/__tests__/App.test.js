import { render, screen } from '@testing-library/react'
import App from '../App'

test('testing App.js', () => {
  render(<App />)
  const logo = screen.getByTestId('logo')
  expect(logo).toBeInTheDocument()
})
