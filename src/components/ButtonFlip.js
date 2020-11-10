import flip from '../assets/exchange.svg'

import './ButtonFlip.scss'

const componentStyle = 'Calculator'

const ButtonFlip = ({ state, setState }) => {
  const handleFlip = (e) => {
    e.preventDefault()
    setState({
      ...state,
      haveCurrency: state.getCurrency,
      getCurrency: state.haveCurrency,
    })
  }
  return (
    <button onClick={handleFlip} className={`${componentStyle}__flipper`}>
      <img alt="Flip currency" src={flip} />
    </button>
  )
}

export default ButtonFlip
