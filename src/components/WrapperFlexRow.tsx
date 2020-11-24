import React from 'react'

import './WrapperFlexRow.scss'

type Props = {
  children: React.ReactNode
}

const componentStyle = 'WrapperFlexRow'

const WrapperFlexRow = ({ children }: Props) => (
  <div className={componentStyle}>{children}</div>
)

export default WrapperFlexRow
