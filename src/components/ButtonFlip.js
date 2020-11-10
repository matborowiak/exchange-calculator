import flip from '../assets/exchange.svg'

import './ButtonFlip.scss'

const componentStyle = 'Calculator'

const ButtonFlip = ({ handleFlip }) => {
  return (
    <button onClick={handleFlip} className={`${componentStyle}__flipper`}>
      <img alt="Flip currency" src={flip} />
    </button>
  )
}

export default ButtonFlip
