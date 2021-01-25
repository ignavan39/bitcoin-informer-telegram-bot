const fetch = require('node-fetch')

const getData = async(coin) => {
    let data = await fetch('https://api.bitaps.com/market/v1/tickers/BINANCE')
    data =  await data.json()
    data = data.data.BINANCE.pairs

    coin = coin.toUpperCase() + 'USDT';
    const coins = Object.keys(data)
    if(!coins.includes(coin)){
        throw "Такой валюты нет";
    };
    return data[coin]

};

module.exports = {
    getData
}