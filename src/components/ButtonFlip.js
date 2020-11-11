import flip from '../assets/exchange.svg'

import './ButtonFlip.scss'

const componentStyle = 'ButtonFlip'

const ButtonFlip = ({ handleFlip }) => {
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
