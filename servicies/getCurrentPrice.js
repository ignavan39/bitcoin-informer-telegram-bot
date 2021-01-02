const fetch = require("node-fetch");

const getCurrentCurrency = async (currency_id, vsCurrency) =>{

    let symbol = currency_id.toUpperCase() + vsCurrency.toUpperCase()
    if(vsCurrency === 'usd'){
        symbol += 'T'
    }
    return fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
        .then(value => value.json()).then(value => ({
            lastPrice: value.lastPrice.split('.')[0],
            lowPrice: value.lowPrice.split('.')[0],
            highPrice: value.highPrice.split('.')[0]
        }))
        .catch(() => undefined)
}

module.exports = {
    getCurrentCurrency
}
