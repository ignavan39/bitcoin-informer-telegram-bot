const fetch = require("node-fetch");
const { client } = require("../config/config");
const { ALL_COINS, ALL_VS_CURRENCIES } = require("../types/keys");


const fetchAllCoins = async () => {
    return fetch("https://api.coingecko.com/api/v3/coins/list").then(res => res.json())
}

const fetchAllVsCurrencies = async () => {
    return fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies").then(res => res.json())
}

const getAllCoins = async () => {
    const allCoinsRedis = client.get(ALL_COINS)
   //if (!allCoinsRedis) {
    const res = await fetchAllCoins()
    client.set(ALL_COINS, JSON.stringify(res))
    return res
    //return JSON.parse(allCoinsRedis)
}

const getAllVsCurrencies = async () => {
    const allVsCurrencies = client.get(ALL_VS_CURRENCIES)
    if (!allVsCurrencies) {
        const res = await fetchAllVsCurrencies()
        client.set(ALL_VS_CURRENCIES, JSON.stringify(res))
        return res

    }
    return JSON.parse(allVsCurrencies)
}

module.exports = {
    getAllVsCurrencies: getAllVsCurrencies,
    getAllCoins,
}