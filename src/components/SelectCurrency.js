import './SelectCurrency.scss'

const componentStyle = 'SelectCurrency'

const SelectCurrency = ({ value, selectHandler, availableCurrencies }) => {
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
            {currency.toUpperCase()}
          </option>
        ))}
      </select>
    </>
  )
}

export default SelectCurrency
