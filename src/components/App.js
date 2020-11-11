import Calculator from './Calculator'
import Header from './Header'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Calculator
        exchangeBaseCurrency="USD"
        defaultHave="EUR"
        defaultGet="GBP"
        availableCurrencies={['USD', 'EUR', 'GBP']}
      />
    </div>
  )
}

export default App
