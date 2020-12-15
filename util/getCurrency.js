
const fetch = require("node-fetch");

const getCurrencyToUSD = async (currency_id) => {
    return  fetch(`https://api.coingecko.com/api/v3/coins/${currency_id}`)
    .then((res)=>res.json())
    .then(res =>  (
        res.market_data.current_price.usd
        ))
}

module.exports = {
    getCurrencyToUSD
}

