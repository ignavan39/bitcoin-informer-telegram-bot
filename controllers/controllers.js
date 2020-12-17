/**
const {telegram} = require("../config/config");
const {getCurrency} = require("../util/getCurrency");
const {currencyNameToCoin} = require("../util/filterByCoinName")

const mainLoop = async (currency, vs_currency, chatId) => {



    let old_currency = await getCurrency(await currencyNameToCoin(currency), vs_currency);
    let current_currency = old_currency;
    let percentage = current_currency / old_currency;
    chatId = parseInt(chatId)
    console.log(`${currency} ${vs_currency} ${chatId}`)
    setInterval(async () => {
        current_currency = await getCurrency(await currencyNameToCoin(currency), vs_currency);
        console.log(`${current_currency}`)
        if (current_currency !== old_currency) {
            percentage = ((current_currency / old_currency - 1) * 100).toFixed(2);
            if (percentage > 0) {
                await telegram.sendMessage(chatId,
                    `🟢 ${currency.toUpperCase()} ${current_currency}$ ⬆️ (+${percentage}%)`)
                await telegram.setChatTitle(chatId,
                    `🟢 ${currency.toUpperCase()} ${current_currency}$ ⬆️ (${percentage}%)`)
            } else {
                await telegram.sendMessage(chatId,
                    `🟢 ${currency.toUpperCase()} ${current_currency}$ ⬆️ (${percentage}%)`)
                await telegram.setChatTitle(chatId,
                    `🔴 ${currency.toUpperCase()} ${current_currency}$ ⬇️️ ( ${percentage}%)`)
            }
        }
        old_currency = current_currency;
    }, 5000);
};

module.exports = {mainLoop}
**/