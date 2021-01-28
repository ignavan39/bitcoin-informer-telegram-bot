const fetch = require("node-fetch");

const checkCurrency = async (coin, vsCurrency) => {
    if(vsCurrency !== 'usd'){
        throw 'Нет такой валюты'
    } 
    let data = await fetch("https://api.bitaps.com/market/v1/tickers/BINANCE").then(res => res.json())
    data = data.data.BINANCE.pairs
    coin = coin.toUpperCase() + "USDT"
    const coins = Object.keys(data)
    if (!coins.includes(coin)) {
        throw 'Нет такой валюты'
    }
}

module.exports = {
  checkCurrency,
};
