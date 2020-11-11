import axios from 'axios'

const fetchRates = async (have, get, base) => {
  return await axios
    .post(
      'https://openexchangerates.org/api/latest.json?app_id=0c609280a3334d389f61bc9201c8f459&symbols=GBP,EUR'
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
    .catch((err) => console.log(err))
  // // mock for tests
  // return { EUR: 0.8536, GBP: 0.769389 }
  // const response = { data: { rates: { GBP: 0.769389 } } }
  // const data = response.data.rates
  // //validate
  // if (
  //   (base === have && data[get]) ||
  //   (base === get && data[have]) ||
  //   (data[have] && data[get])
  // ) {
  //   console.log('RETURNING DATA')
  //   return data
  // } else {
  //   console.log('THROWING ERROR')
  //   throw { error: 'Received wrong server data!' }
  // }
}

export default fetchRates
