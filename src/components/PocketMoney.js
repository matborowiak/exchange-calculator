import currencySymbols from '../functions/currencySymbols'

import './PocketMoney.scss'

const componentStyle = 'Calculator'

const PocketMoney = ({ pockets, currency }) => {
  const currencySymbol = currencySymbols[currency.toUpperCase()]
  return (
    <div className={`${componentStyle}__wrapper-flex`}>
      <p>{`You have: ${currencySymbol} ${pockets[currency].toFixed(2)}`}</p>
    </div>
  )
}

export default PocketMoney
