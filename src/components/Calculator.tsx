import React, { useState, useEffect, useCallback } from 'react'

import ButtonExchange from './ButtonExchange'
import ButtonFlip from './ButtonFlip'
import CalculatorInput from './CalculatorInput'
import DisplayError from './DisplayError'
import DisplayRate from './DisplayRate'
import PocketMoney from './PocketMoney'
import SelectCurrency from './SelectCurrency'
import WrapperFlexRow from './WrapperFlexRow'

import useInterval from '../utils/useInterval'
import fetchRates from '../api/fetchRates'

import './Calculator.scss'

const inputSanitizer = RegExp(/^\d+\.?(\d{1,2})?$/)
const componentStyle = 'Calculator'
const connectionErrorMsg = 'Connection error!'
const notEnoughFundsErrorMsg = 'Not enough funds!'

type FetchRateState = {
  pair?: Record<string, number>
  error: boolean | string
  loading: boolean
}

export type Pockets = Record<string, number>

type Props = {
  exchangeBaseCurrency: string
  defaultHave: string
  defaultGet: string
  availableCurrencies: Array<string>
}

const Calculator = ({
  exchangeBaseCurrency,
  defaultHave,
  defaultGet,
  availableCurrencies,
}: Props) => {
  const [pockets, setPockets] = useState<Pockets>({
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

  const [fetchRateState, setFetchRateState] = useState<FetchRateState>({
    error: false,
    loading: true,
  })

  const [rate, setRate] = useState(1)

  // refactor edit single field
  const calculateExchange = useCallback(
    (value) => {
      if (value.length === 0 || inputSanitizer.test(value)) {
        const currencyKey: keyof Pockets = state.haveCurrency
        if (value > pockets[currencyKey]) {
          setFetchRateState({
            pair: fetchRateState.pair,
            loading: fetchRateState.loading,
            error: notEnoughFundsErrorMsg,
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    calculateExchange(value)
  }

  useEffect(() => {
    calculateExchange(state.youHave)
  }, [state.youHave, calculateExchange])

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

  useEffect(() => {
    fetchRates(defaultHave, defaultGet, exchangeBaseCurrency)
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
          pair: {},
          error: connectionErrorMsg,
          loading: false,
        })
      })
  }, [fetchRateState.error, exchangeBaseCurrency, defaultHave, defaultGet])

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
          pair: {},
          error: connectionErrorMsg,
          loading: false,
        })
      })
  }, 10000)

  // handle flip for button should be different than handling flip from code logic
  const handleFlip = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e && e.preventDefault()
    setState({
      ...state,
      haveCurrency: state.getCurrency,
      getCurrency: state.haveCurrency,
    })
  }

  const selectCurrencyFromHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
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

  const selectCurrencyToHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
              disabled={fetchRateState.error === connectionErrorMsg}
              value={state.youHave}
              readOnly={false}
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
            <CalculatorInput
              disabled={fetchRateState.error === connectionErrorMsg}
              readOnly
              value={state.youGet}
              handleInput={() => null}
              plusminus="+"
            />
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
