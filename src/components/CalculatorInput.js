import './CalculatorInput.scss'

const componentStyle = 'Calculator'

const CalculatorInput = ({ value, handleInput, plusminus, readOnly }) => (
  <div className={`${componentStyle}__wrapper-flex`}>
    <p className={`${componentStyle}__input-plusminus`}>
      {value !== '' && value > 0 && plusminus}
    </p>
    <input
      className={`${componentStyle}__input`}
      value={value}
      type="string"
      readOnly={readOnly}
      onChange={handleInput}
      placeholder={'0.00'}
      maxLength="20"
    />
  </div>
)

export default CalculatorInput
