import './WrapperFlexRow.scss'

const componentStyle = 'WrapperFlexRow'

const WrapperFlexRow = (props) => (
  <div className={componentStyle}>{props.children}</div>
)

export default WrapperFlexRow
