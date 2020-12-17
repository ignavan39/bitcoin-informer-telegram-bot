
const getIdCurrency = async (currency_name) => {
    const allCoins = await getAllCoins()
    return allCoins.find(item => item.symbol === currency_name).id
}

module.exports = getIdCurrency
