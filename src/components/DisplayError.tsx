import React from 'react'

interface Props {
  error: string | boolean
}
const DisplayError = ({ error }: Props) => {
  return <>{error && <p>{error.toString()}</p>}</>
}

export default DisplayError
