const fetch = require("node-fetch");

const getData = async (coin) => {
  let data = await fetch("https://api.bitaps.com/market/v1/tickers/BINANCE").then(res => res.json());
  data = data.data.BINANCE.pairs
  coin = coin.toUpperCase() + "USDT"
  return data[coin]
};

module.exports = {
  getData,
};
