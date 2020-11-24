import React from 'react'

import currencySymbols from '../constant/currencySymbols'
import { Pockets } from './Calculator'

import './PocketMoney.scss'

type Props = {
  pockets: Pockets
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
