const fetch = require("node-fetch");

const getCurrency = async (currency_id,vsCurrency) => {
  return fetch(`https://api.coingecko.com/api/v3/coins/${currency_id}`)
    .then((res) => res.json())
    .then((res) => Object.entries(res.market_data.current_price).find(item=>item[0]=== vsCurrency)[1])
};

module.exports = {
  getCurrency,
};
