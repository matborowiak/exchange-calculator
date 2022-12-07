import React, { MouseEvent } from 'react'
import './ButtonExchange.scss'
import { Pockets } from './App'

const componentStyle = 'ButtonExchange'

interface Props {
  state: {
    haveCurrency: string
    getCurrency: string
    youHave: string
    youGet: string
  }
  pockets: Pockets
  setState: React.Dispatch<
    React.SetStateAction<{
      haveCurrency: string
      getCurrency: string
      youGet: string
      youHave: string
    }>
  >
  setPockets: (prop: Pockets) => void
  youHave: string
  fetchRateState: { loading: boolean; error: string | boolean }
}

const ButtonExchange = ({
  state,
  pockets,
  setState,
  setPockets,
  youHave,
  fetchRateState,
}: Props) => {
  const handlerExchange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const newPocketsState = pockets
    newPocketsState[state.haveCurrency] -= parseFloat(state.youHave)
    newPocketsState[state.getCurrency] += parseFloat(state.youGet)
    setPockets(newPocketsState)
    setState({ ...state, youHave: '', youGet: '' })
  }
  const disabled = !!(
    fetchRateState.loading ||
    fetchRateState.error ||
    !(parseFloat(youHave) > 0)
  )
  return (
    <button
      type="submit"
      form="calculator"
      className={componentStyle}
      disabled={disabled}
      onClick={handlerExchange}
    >
      EXCHANGE
    </button>
  )
}

export default ButtonExchange
