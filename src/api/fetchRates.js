import axios from 'axios'

const fetchRates = async (have, get, base) => {
  return await axios
    .get(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_APP_ID}&symbols=GBP,EUR`
    )
    .then((response) => {
      const data = response.data.rates
      //validate
      if (
        (base === have && data[get]) ||
        (base === get && data[have]) ||
        (data[have] && data[get])
      ) {
        return data
      } else {
        throw new Error('Received wrong server data!')
      }
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

export default fetchRates
