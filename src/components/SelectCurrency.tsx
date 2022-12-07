import React from 'react'

import './SelectCurrency.scss'

const componentStyle = 'SelectCurrency'

interface Props {
  value: string
  selectHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  availableCurrencies: Array<string>
}

const SelectCurrency = ({
  value,
  selectHandler,
  availableCurrencies,
}: Props) => {
  return (
    <>
      <select
        data-testid="select"
        className={componentStyle}
        value={value}
        onChange={selectHandler}
      >
        {availableCurrencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </>
  )
}

export default SelectCurrency
