import './WrapperFlexRow.scss'

const componentStyle = 'Calculator'

const WrapperFlexRow = (props) => (
  <div className={`${componentStyle}__exchange-field`}>{props.children}</div>
)

export default WrapperFlexRow
