const fetch = require("node-fetch");

const getCurrentPrice = async (currency_id, vsCurrency) =>{

    let symbol = currency_id.toUpperCase() + vsCurrency.toUpperCase()
    if(vsCurrency === 'usd'){
        symbol += 'T'
    }
    return fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
        .then(value => value.json()).then(value =>
            ({
            lastPrice: parseFloat(value.lastPrice).toFixed(2),
            lowPrice: value.lowPrice.split('.')[0],
            highPrice: value.highPrice.split('.')[0],
            percentage: parseFloat(value.priceChangePercent).toFixed(2)
        }))
        .catch(() => undefined)
}

module.exports = {
    getCurrentPrice
}
