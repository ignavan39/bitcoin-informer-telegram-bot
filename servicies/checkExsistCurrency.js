const {getAllCoins, getAllVsCurrencies} = require("./getInfo")

const checkInAllCoins = async (coinName) => {
    let allCoins = await getAllCoins()
    const res = allCoins.find(item => item.id === coinName)
    if (!res) {
        return false
    }
    return true
}

const checkInVsCurrency = async (vsCurrency) => {
    let allVsCurrency = await getAllVsCurrencies()
    const res = allVsCurrency.find(item => item === vsCurrency)
    if (!res) {
        return false
    }
    return true
}

module.exports = {
    checkInAllCoins,
    checkInVsCurrency
}