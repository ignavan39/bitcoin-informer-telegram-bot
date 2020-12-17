const { telegram } = require("../config/config");
const { getCurrency } = require("../servicies/getCurrency");
const { currencyNameToCoin } = require("../servicies/getInfo")

const mainLoop = async (currency, vs_currency, chatId) => {

    // market_data->price_change_percentage_24h_in_currency->usd

    let marketData = await getCurrency(await currencyNameToCoin(currency), vs_currency)
    if (!marketData) {
        telegram.sendMessage(`problem in command : unknown `)
        return;
    }

    let percentage = marketData.percentage
    let currentCurrency = marketData.price

    chatId = parseInt(chatId)
    console.log(`${currency} ${vs_currency} ${chatId}`)

    let timer = 0

    setInterval(async () => {
        if (timer === 12) {
            timer = 0

        }
        marketData = await getCurrency(await currencyNameToCoin(currency), vs_currency).price;
        if (!marketData) {
            clearInterval(this)
            return;
        }
        console.log(`${marketData}`)

        percentage = ((currentCurrency / oldCurrency - 1) * 100).toFixed(2);
        if (percentage > 0) {
            await telegram.sendMessage(chatId,
                `🟢 ${currency.toUpperCase()} ${currentCurrency}$ ⬆️ (+${percentage}%)`)
            await telegram.setChatTitle(chatId,
                `🟢 ${currency.toUpperCase()} ${currentCurrency}$ ⬆️ (${percentage}%)`)
        } else {
            await telegram.sendMessage(chatId,
                `🟢 ${currency.toUpperCase()} ${currentCurrency}$ ⬆️ (${percentage}%)`)
            await telegram.setChatTitle(chatId,
                `🔴 ${currency.toUpperCase()} ${currentCurrency}$ ⬇️️ ( ${percentage}%)`)
        }

        timer++
    }, 5000);
};

module.exports = { mainLoop }