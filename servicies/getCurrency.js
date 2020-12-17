const fetch = require("node-fetch");

const getCurrency = async (currency_id, vsCurrency) => {
    return fetch(`https://api.coingecko.com/api/v3/coins/${currency_id}`)
        .then((res) => res.json())
        .then((res) => ({
            price: Object.entries(res.market_data.current_price).find(item => item[0] === vsCurrency)[1],
            percentage: Object.entries(res.market_data.price_change_percentage_24h_in_currency).find(item => item[0] === vsCurrency),
            allInfo: {...res.market_data}
        }))
};

module.exports = {
    getCurrency,
};