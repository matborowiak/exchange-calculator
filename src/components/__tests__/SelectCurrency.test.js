import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import SelectCurrency from '../SelectCurrency'

const selectHandler = jest.fn()

const MockParent = () => {
  const [state, setState] = useState('EUR')
  const selectHandler = (e) => setState(e.target.value)
  return (
    <SelectCurrency
      value={state}
      selectHandler={selectHandler}
      availableCurrencies={['EUR', 'GBP', 'USD']}
    />
  )
}

const setup = () => {
  const utils = render(<MockParent />)

  const select = utils.getByTestId('select')
  return {
    select,
    ...utils,
  }
}

test('SelectCurrency renders correct', () => {
  render(
    <SelectCurrency
      value="EUR"
      selectHandler={selectHandler}
      availableCurrencies={['EUR', 'GBP', 'USD']}
    />
  )
  const options = screen.getAllByRole('option')

  const eur = screen.getByText('EUR')
  const gbp = screen.getByText('GBP')
  const usd = screen.getByText('USD')

  expect(eur).toBeInTheDocument()
  expect(gbp).toBeInTheDocument()
  expect(usd).toBeInTheDocument()
  expect(options).toHaveLength(3)
})

test('Simulate select currency', async () => {
  const { select } = setup()

  fireEvent.change(select, { target: { value: 'GBP' } })

  const options = screen.getAllByRole('option')

  expect(options[0].selected).toBeFalsy()
  expect(options[1].selected).toBeTruthy()
  expect(options[2].selected).toBeFalsy()
})
