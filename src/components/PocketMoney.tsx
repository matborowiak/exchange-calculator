import React from 'react'

import currencySymbols from '../constant/currencySymbols'

import './PocketMoney.scss'

interface Props {
  pockets: Record<string, number>
  currency: string
}

const componentStyle = 'PocketMoney'

const PocketMoney = ({ pockets, currency }: Props) => {
  const currencySymbol = currencySymbols[currency]
  return (
    <div className={componentStyle}>
      <p>{`You have: ${currencySymbol} ${pockets[currency].toFixed(2)}`}</p>
    </div>
  )
}

export default PocketMoney
