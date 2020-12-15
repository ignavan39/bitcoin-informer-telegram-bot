const fetch = require("node-fetch");

const get_all_coins =  async() => {
    return fetch("https://api.coingecko.com/api/v3/coins/list").then(res => res.json())
}

const currencyNameToCoin =  async (currency_name) => {
   const allCoins = await get_all_coins()
   return allCoins.find(item => item.symbol === currency_name).id
} 


module.exports = {
    currencyNameToCoin
}