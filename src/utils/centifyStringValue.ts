const centifyStringValue = (valueString: string) => {
  if (valueString.includes(',')) {
    throw new Error(
      `centifyStringValue argument can't include a comma - got: ${valueString}`
    )
  }
  return Math.round(Number(valueString) * 100)
}

export default centifyStringValue