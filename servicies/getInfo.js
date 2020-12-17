const fetch = require("node-fetch");
const {client,redis} = require("../config/config");
const { ALL_COINS, ALL_VS_CURRENCIES } = require("../types/keys");


const fetchAllCoins = async () => {
    return await fetch("https://api.coingecko.com/api/v3/coins/list").then(res => res.json())
}

const fetchAllvsCurrencies =async () => {
    return await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies").then(res => res.json())
}

const getAllCoins = async () => {
    const allCoinsRedis = client.get(ALL_COINS,redis.print)
    if(!allCoinsRedis){
       return await fetchAllCoins().then(res => client.set(ALL_COINS,JSON.stringify(res),redis.print))
    }
    return JSON.parse(allCoinsRedis)
}

const getAllvsCurrencies = async () => {
    const allVsCurrencies = client.get(ALL_VS_CURRENCIES,redis.print)
    if(!allVsCurrencies){
        return await fetchAllvsCurrencies().then(res => client.set(ALL_VS_CURRENCIES,JSON.stringify(res),redis.print))
    }
}

const currencyNameToCoin = async (currency_name) => {
    const allCoins = await getAllCoins()
    return allCoins.find(item => item.symbol === currency_name).id
}


module.exports = {
    currencyNameToCoin,
    getAllvsCurrencies,
    getAllCoins,
}