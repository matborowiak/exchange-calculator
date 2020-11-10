import currencySymbols from '../functions/currencySymbols'

import './DisplayRate.scss'

const componentStyle = 'Calculator'

const DisplayRate = ({ rate, loading, state }) => {
  return (
    <div className={`${componentStyle}__rate`}>
      <div className={`${componentStyle}__rate__wrapper`}>
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
