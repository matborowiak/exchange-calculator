import './SelectCurrency.scss'

const componentStyle = 'SelectCurrency'

const SelectCurrency = ({ value, selectHandler, availableCurrencies }) => {
  return (
    <>
      <select className={componentStyle} value={value} onChange={selectHandler}>
        {availableCurrencies.map((currency) => (
          <option value={currency}>{currency.toUpperCase()}</option>
        ))}
      </select>
    </>
  )
}

export default SelectCurrency
