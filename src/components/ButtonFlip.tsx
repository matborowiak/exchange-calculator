import React from 'react'
import flip from '../assets/exchange.svg'

import './ButtonFlip.scss'

type Props = { handleFlip: (e: React.MouseEvent<HTMLButtonElement>) => void }

const componentStyle = 'ButtonFlip'

const ButtonFlip = ({ handleFlip }: Props) => {
  return (
    <button
      type="button"
      onClick={handleFlip}
      className={`${componentStyle}__flipper`}
    >
      <img alt="Flip currency" src={flip} />
    </button>
  )
}

export default ButtonFlip
