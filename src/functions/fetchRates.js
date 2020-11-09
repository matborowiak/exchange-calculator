import axios from 'axios'

const fetchRates = async () => {
  //   return await axios
  //     .post(
  //       'https://openexchangerates.org/api/latest.json?app_id=0c609280a3334d389f61bc9201c8f459&symbols=GBP,EUR'
  //     )
  //     .then((response) => {
  //       return response.data.rates
  //     })
  //     .catch((err) => console.log(err))
  return { EUR: 0.8536, GBP: 0.769389 }
}

export default fetchRates
