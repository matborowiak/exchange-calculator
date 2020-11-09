import { useState, useEffect } from 'react'

import useInterval from '../functions/useInterval'
import fetchRates from '../functions/fetchRates'
import currencySymbols from '../functions/currencySymbols'

import flip from '../assets/exchange.svg'

import './Calculator.scss'

const SelectCurrency = ({
  value,
  selectForwardHandler,
  availableCurrencies,
}) => {
  return (
    <>
      <select
        className="select-css"
        value={value}
        onChange={selectForwardHandler}
      >
        {availableCurrencies.map((currency) => (
          <option value={currency}>{currency.toUpperCase()}</option>
        ))}
      </select>
    </>
  )
}

const Calculator = ({
  exchangeBaseCurrency,
  defaultHave,
  defaultGet,
  availableCurrencies,
}) => {
  const [pockets, setPockets] = useState({
    usd: 350,
    eur: 200,
    gbp: 500,
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

  useEffect(() => {
    recalculate()
  }, [fetchRateState.pair, rate])

  useEffect(() => {
    calcRate()
  }, [fetchRateState.pair, state.haveCurrency, state.getCurrency])

  useInterval(() => {
    fetchRates()
      .then((pair) => {
        setFetchRateState({
          pair,
          error: false,
          loading: false,
        })
      })
      .catch((err) =>
        setFetchRateState({ ...fetchRateState, error: err, loading: false })
      )
  }, 2000)

  const inputSanitizer = RegExp(/^\d+\.?(\d{1,2})?$/) // works like a charm
  const componentStyle = 'Calculator'
  const placeholder = '0.00'

  const handlerExchange = (e) => {
    e.preventDefault()
    const newPocketsState = pockets
    newPocketsState[state.haveCurrency] -= parseFloat(state.youHave)
    newPocketsState[state.getCurrency] += parseFloat(state.youGet)
    setPockets(newPocketsState)
    setState({ ...state, youHave: '', youGet: '' })
  }

  const calcRate = () => {
    if (fetchRateState.pair) {
      if (state.haveCurrency === exchangeBaseCurrency) {
        const haveRate = 1
        const getRate = fetchRateState.pair[state.getCurrency.toUpperCase()]
        setRate(getRate / haveRate)
      } else if (state.getCurrency === exchangeBaseCurrency) {
        const haveRate = fetchRateState.pair[state.haveCurrency.toUpperCase()]
        const getRate = 1
        setRate(getRate / haveRate)
      } else {
        const haveRate = fetchRateState.pair[state.haveCurrency.toUpperCase()]
        const getRate = fetchRateState.pair[state.getCurrency.toUpperCase()]
        setRate(getRate / haveRate)
      }
    }
  }

  const recalculate = () => {
    const eventMock = {
      target: {
        value: state.youHave,
      },
    }
    handleInput(eventMock)
  }

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

  const handleInput = (e) => {
    const { value } = e.target
    if (value.length === 0 || inputSanitizer.test(value)) {
      if (value > pockets[state.haveCurrency]) {
        setFetchRateState({ ...fetchRateState, error: 'Not enough funds!!!' })
      }
      setState({
        ...state,
        youHave: value,
        youGet: (value * rate).toFixed(2),
      })
    }
  }

  return (
    <div className={componentStyle}>
      <form className={`${componentStyle}__wrapper`}>
        <div className={`${componentStyle}__rate`}>
          <div className={`${componentStyle}__rate__wrapper`}>
            {fetchRateState.loading === true ? (
              <p>...loading </p>
            ) : (
              <p>
                {`${currencySymbols[state.haveCurrency.toUpperCase()]}1 = ${
                  currencySymbols[state.getCurrency.toUpperCase()]
                }${rate.toFixed(4)}`}
              </p>
            )}
          </div>
        </div>
        <div className={`${componentStyle}__exchange-field`}>
          <div className={`${componentStyle}__exchange-field__exchange`}>
            <SelectCurrency
              value={state.haveCurrency}
              selectForwardHandler={selectCurrencyFromHandler}
              availableCurrencies={availableCurrencies}
            />
            <div className={`${componentStyle}__wrapper-flex`}>
              <p className={`${componentStyle}__input-plusminus`}>
                {state.youHave !== '' && state.youHave > 0 && '-'}
              </p>
              <input
                className={`${componentStyle}__input`}
                value={state.youHave}
                type="string"
                onChange={handleInput}
                placeholder={placeholder}
                maxLength="20"
              />
            </div>
          </div>
          <div className={`${componentStyle}__wrapper-flex`}>
            <p>{`You have: ${
              currencySymbols[state.haveCurrency.toUpperCase()]
            } ${pockets[state.haveCurrency].toFixed(2)}`}</p>
          </div>
        </div>

        <button onClick={handleFlip} className={`${componentStyle}__flipper`}>
          <img alt="Flip currency" src={flip} />
        </button>

        <div className={`${componentStyle}__exchange-field`}>
          <div className={`${componentStyle}__exchange-field__exchange`}>
            <SelectCurrency
              value={state.getCurrency}
              selectForwardHandler={selectCurrencyToHandler}
              availableCurrencies={availableCurrencies}
            />
            <div className={`${componentStyle}__wrapper-flex`}>
              <p className={`${componentStyle}__input-plusminus`}>
                {state.youHave !== '' && state.youHave > 0 && '+'}
              </p>
              <input
                className={`${componentStyle}__input`}
                value={state.youGet}
                type="string"
                placeholder={placeholder}
                maxLength="20"
                readOnly
              />
            </div>
          </div>
          <div className={`${componentStyle}__wrapper-flex`}>
            <p>
              {`You have: ${
                currencySymbols[state.getCurrency.toUpperCase()]
              } ${pockets[state.getCurrency].toFixed(2)}`}
            </p>
          </div>
        </div>
        <button // refactor disabled prop
          className={`${componentStyle}__button`}
          disabled={
            fetchRateState.loading ||
            fetchRateState.error ||
            state.youHave === '' ||
            state.youHave === '0' ||
            state.youHave === '0.' ||
            state.youHave === '0.0' ||
            state.youHave === '0.00'
          }
          onClick={handlerExchange}
        >
          EXCHANGE
        </button>
      </form>
      {fetchRateState.error && <p>{fetchRateState.error.toString()}</p>}
    </div>
  )
}

export default Calculator
