import { useState, useEffect, useCallback } from 'react'

import ButtonExchange from './ButtonExchange'
import ButtonFlip from './ButtonFlip'
import CalculatorInput from './CalculatorInput'
import DisplayError from './DisplayError'
import DisplayRate from './DisplayRate'
import PocketMoney from './PocketMoney'
import SelectCurrency from './SelectCurrency'
import WrapperFlexRow from './WrapperFlexRow'

import useInterval from '../functions/useInterval'
import fetchRates from '../functions/fetchRates'

import './Calculator.scss'

const inputSanitizer = RegExp(/^\d+\.?(\d{1,2})?$/)
const componentStyle = 'Calculator'

const Calculator = ({
  exchangeBaseCurrency,
  defaultHave,
  defaultGet,
  availableCurrencies,
}) => {
  const [pockets, setPockets] = useState({
    USD: 350,
    EUR: 200,
    GBP: 500,
  })

  const [state, setState] = useState({
    haveCurrency: defaultHave,
    getCurrency: defaultGet,
    youGet: '',
    youHave: '',
  })

  const [fetchRateState, setFetchRateState] = useState({
    error: false,
    loading: true,
  })

  const [rate, setRate] = useState(1)

  const calculateExchange = useCallback(
    (value) => {
      if (value.length === 0 || inputSanitizer.test(value)) {
        // check if enough funds
        if (value > pockets[state.haveCurrency]) {
          setFetchRateState({
            pair: fetchRateState.pair,
            loading: fetchRateState.loading,
            error: 'Not enough funds!!!',
          })
        } else {
          setFetchRateState({
            pair: fetchRateState.pair,
            loading: fetchRateState.loading,
            error: false,
          })
        }

        setState({
          haveCurrency: state.haveCurrency,
          getCurrency: state.getCurrency,
          youHave: value,
          youGet: (value * rate).toFixed(2),
        })
      }
    },
    [
      state.haveCurrency,
      state.getCurrency,
      rate,
      pockets,
      fetchRateState.loading,
      fetchRateState.pair,
      setFetchRateState,
    ]
  )

  const handleInput = (e) => {
    const { value } = e.target
    calculateExchange(value)
  }

  // calculate exchange on every rate update or when swapping pockets
  useEffect(() => {
    calculateExchange(state.youHave)
  }, [state.youHave, calculateExchange])

  // recalculate rate
  useEffect(() => {
    const getCurrency = state.getCurrency
    const haveCurrency = state.haveCurrency
    if (fetchRateState.pair) {
      if (state.haveCurrency === exchangeBaseCurrency) {
        const getRate = fetchRateState.pair[getCurrency]
        setRate(getRate)
      } else if (state.getCurrency === exchangeBaseCurrency) {
        const haveRate = fetchRateState.pair[haveCurrency]
        const getRate = 1
        setRate(getRate / haveRate)
      } else {
        const haveRate = fetchRateState.pair[haveCurrency]
        const getRate = fetchRateState.pair[getCurrency]
        setRate(getRate / haveRate)
      }
    }
  }, [
    fetchRateState.pair,
    state.haveCurrency,
    state.getCurrency,
    exchangeBaseCurrency,
  ])

  // fetch on initial load
  useEffect(() => {
    fetchRates(state.haveCurrency, state.getCurrency, exchangeBaseCurrency)
      .then((pair) => {
        setFetchRateState({
          pair,
          error: fetchRateState.error ? fetchRateState.error : false,
          loading: false,
        })
      })
      .catch((err) => {
        console.log(err)
        setFetchRateState({
          error: 'Connection error!',
          loading: false,
        })
      })
  }, [
    fetchRateState.error,
    state.haveCurrency,
    state.getCurrency,
    exchangeBaseCurrency,
  ])

  // fetch intervals
  useInterval(() => {
    fetchRates(state.haveCurrency, state.getCurrency, exchangeBaseCurrency)
      .then((pair) => {
        setFetchRateState({
          pair,
          error: fetchRateState.error ? fetchRateState.error : false,
          loading: false,
        })
      })
      .catch((err) => {
        console.log(err)
        setFetchRateState({
          error: 'Connection error!',
          loading: false,
        })
      })
  }, 10000)

  const handleFlip = (e) => {
    e && e.preventDefault()
    setState({
      ...state,
      haveCurrency: state.getCurrency,
      getCurrency: state.haveCurrency,
    })
  }

  const selectCurrencyFromHandler = (e) => {
    const { value } = e.target
    if (value === state.getCurrency) {
      handleFlip()
    } else {
      setState({
        ...state,
        haveCurrency: value,
        getCurrency: state.getCurrency,
      })
    }
  }

  const selectCurrencyToHandler = (e) => {
    const { value } = e.target
    if (value === state.haveCurrency) {
      handleFlip()
    } else {
      setState({
        ...state,
        haveCurrency: state.haveCurrency,
        getCurrency: value,
      })
    }
  }

  return (
    <div className={componentStyle}>
      <form id="calculator" className={`${componentStyle}__wrapper`}>
        <DisplayRate
          state={state}
          rate={rate}
          loading={fetchRateState.loading}
        />
        <div>
          <WrapperFlexRow>
            <SelectCurrency
              value={state.haveCurrency}
              selectHandler={selectCurrencyFromHandler}
              availableCurrencies={availableCurrencies}
            />
            <CalculatorInput
              value={state.youHave}
              handleInput={handleInput}
              plusminus="-"
            />
          </WrapperFlexRow>
          <PocketMoney pockets={pockets} currency={state.haveCurrency} />
        </div>
        <ButtonFlip handleFlip={handleFlip} />
        <div>
          <WrapperFlexRow>
            <SelectCurrency
              value={state.getCurrency}
              selectHandler={selectCurrencyToHandler}
              availableCurrencies={availableCurrencies}
            />
            <CalculatorInput readOnly value={state.youGet} plusminus="+" />
          </WrapperFlexRow>
          <PocketMoney pockets={pockets} currency={state.getCurrency} />
        </div>
        <ButtonExchange
          fetchRateState={fetchRateState}
          pockets={pockets}
          setPockets={setPockets}
          state={state}
          setState={setState}
          youHave={state.youHave}
        />
      </form>
      <DisplayError error={fetchRateState.error} />
    </div>
  )
}

export default Calculator
