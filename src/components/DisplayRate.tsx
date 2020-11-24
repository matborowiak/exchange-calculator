import React from 'react'
import currencySymbols from '../constant/currencySymbols'

import { CurrencySymbols } from '../constant/currencySymbols'

import './DisplayRate.scss'

type Props = {
  rate: number
  loading: boolean
  state: { haveCurrency: string; getCurrency: string }
}

const componentStyle = 'DisplayRate'

const DisplayRate = ({ rate, loading, state }: Props) => {
  const symbol: keyof CurrencySymbols = state.getCurrency
  return (
    <div className={componentStyle}>
      <div className={`${componentStyle}__wrapper`}>
        {loading === true ? (
          <p>...loading </p>
        ) : (
          <p>
            {`${currencySymbols[symbol]}1 = ${
              currencySymbols[symbol]
            }${rate.toFixed(4)}`}
          </p>
        )}
      </div>
    </div>
  )
}

export default DisplayRate
