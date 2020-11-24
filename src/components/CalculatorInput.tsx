import React from 'react'
import './CalculatorInput.scss'

type Props = {
  value: any
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  plusminus: string
  readOnly: boolean
  disabled: boolean
}

const componentStyle = 'CalculatorInput'

const CalculatorInput = ({
  value,
  handleInput,
  plusminus,
  readOnly,
  disabled,
}: Props) => (
  <div className={`${componentStyle}__wrapper-flex`}>
    <p className={`${componentStyle}__plusminus`}>
      {value !== '' && value > 0 && plusminus}
    </p>
    <input
      className={`${componentStyle}`}
      disabled={disabled}
      value={value}
      type="number"
      step={'0.01'}
      readOnly={readOnly}
      onChange={handleInput}
      onKeyDown={(e) =>
        ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
      }
      placeholder={'0.00'}
      maxLength={20}
    />
  </div>
)

export default CalculatorInput
