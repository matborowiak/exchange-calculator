import axios from 'axios'

const fetchRates = async (have, get, base) => {
  return await axios
    .get(
      'https://openexchangerates.org/api/latest.json?app_id=5d4a3bd8d4fd48e684a66bc032fffa10&symbols=GBP,EUR'
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
