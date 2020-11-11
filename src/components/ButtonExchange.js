import './ButtonExchange.scss'

const componentStyle = 'ButtonExchange'

const ButtonExchange = ({
  state,
  pockets,
  setState,
  setPockets,
  youHave,
  fetchRateState,
}) => {
  const handlerExchange = (e) => {
    e.preventDefault()
    const newPocketsState = pockets
    newPocketsState[state.haveCurrency] -= parseFloat(state.youHave)
    newPocketsState[state.getCurrency] += parseFloat(state.youGet)
    setPockets(newPocketsState)
    setState({ ...state, youHave: '', youGet: '' })
  }
  return (
    <button
      type="submit"
      form="calculator"
      className={componentStyle}
      disabled={
        fetchRateState.loading ||
        fetchRateState.error ||
        !(parseFloat(youHave) > 0)
      }
      onClick={handlerExchange}
    >
      EXCHANGE
    </button>
  )
}

export default ButtonExchange
