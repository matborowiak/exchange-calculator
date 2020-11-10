import currencySymbols from '../functions/currencySymbols'

import './DisplayRate.scss'

const componentStyle = 'DisplayRate'

const DisplayRate = ({ rate, loading, state }) => {
  return (
    <div className={componentStyle}>
      <div className={`${componentStyle}__wrapper`}>
        {loading === true ? (
          <p>...loading </p>
        ) : (
          <p>
            {`${currencySymbols[state.haveCurrency.toUpperCase()]}1 = ${
              currencySymbols[state.getCurrency.toUpperCase()]
            }${rate.toFixed(4)}`}
          </p>
        )}
      </div>
    </div>
  )
}

export default DisplayRate
