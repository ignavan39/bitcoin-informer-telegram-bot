const fetch = require("node-fetch");
const { client, redis } = require("../config/config");
const { ALL_COINS, ALL_VS_CURRENCIES } = require("../types/keys");
const {getData,saveData} = require('../common/savedata')

const fetchAllCoins = async () => {
    return fetch("https://api.coingecko.com/api/v3/coins/list").then(res => res.json())
}

const fetchAllvsCurrencies = async () => {
    return fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies").then(res => res.json())
}

const getAllCoins = async () => {
    const data = getData(ALL_COINS)
    if(data === null){
        const res = await fetchAllCoins()
        saveData(ALL_COINS,res)
        return res
    }
    return JSON.parse(data)
}

const getAllvsCurrencies = async () => {

    const data = getData(ALL_VS_CURRENCIES)
    if(data === null){
        const res = await fetchAllvsCurrencies()
        saveData(ALL_VS_CURRENCIES,res)
        return res
    }
    return JSON.parse(data)

}

module.exports = {
    getAllvsCurrencies,
    getAllCoins,
    fetchAllCoins,
    fetchAllvsCurrencies
}