const DisplayError = ({ error }) => {
  return <>{error && <p>{error.toString()}</p>}</>
}

export default DisplayError
