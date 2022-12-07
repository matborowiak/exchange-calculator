import React from 'react'
import currencySymbols from '../constant/currencySymbols'

import { CurrencySymbols } from '../constant/currencySymbols'

import './DisplayRate.scss'

interface Props {
  rate: number
  loading: boolean
  state: { haveCurrency: string; getCurrency: string }
}

const componentStyle = 'DisplayRate'

const DisplayRate = ({ rate, loading, state }: Props) => {
  const getSymbol: keyof CurrencySymbols = state.getCurrency
  const haveSymbol: keyof CurrencySymbols = state.haveCurrency

  return (
    <div className={componentStyle}>
      <div className={`${componentStyle}__wrapper`}>
        {loading === true ? (
          <p>...loading </p>
        ) : (
          <p>
            {`${currencySymbols[haveSymbol]}1 = ${
              currencySymbols[getSymbol]
            }${rate.toFixed(4)}`}
          </p>
        )}
      </div>
    </div>
  )
}

export default DisplayRate
