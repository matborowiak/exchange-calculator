import { render, screen } from '@testing-library/react'
import App from '../App'

test('testsing App.js', () => {
  render(<App />)
  const logo = screen.getByTestId('logo')
  expect(logo).toBeInTheDocument()
})
