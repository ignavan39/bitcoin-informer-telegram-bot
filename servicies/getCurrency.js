const fetch = require("node-fetch");

const getCurrency = async (currency_id, vsCurrency) => {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/${currency_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  )
    .then((res) => res.json())
    .then((res) => ({
      name: res.name,
      price: res.market_data.current_price[vsCurrency],
      percentage:
        res.market_data.price_change_percentage_24h_in_currency[vsCurrency],
      allInfo: { ...res.market_data },
    }));
};

module.exports = {
  getCurrency,
};
