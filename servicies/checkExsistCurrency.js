const {getAllCoins, getAllVsCurrencies} = require("./getInfo")

const checkInAllCoins = async (coinName) => {
    let allCoins = await getAllCoins()
    return allCoins.find(item => item.symbol === coinName)
}

const checkInVsCurrency = async (vsCurrency) => {
    let allVsCurrency = await getAllVsCurrencies()
    return allVsCurrency.find(item => item === vsCurrency)
}

module.exports = {
    checkInAllCoins,
    checkInVsCurrency
}
