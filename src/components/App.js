import Calculator from './Calculator'
import Header from './Header'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Calculator
        exchangeBaseCurrency="usd"
        defaultHave="eur"
        defaultGet="gbp"
        availableCurrencies={['usd', 'eur', 'gbp']}
      />
    </div>
  )
}

export default App
