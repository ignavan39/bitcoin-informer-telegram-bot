import {getCurrency} from "../util/getCurrency";
const { bot, test_channel } = require('../config/config')
const { telegram } = require('../config/config')

export const mainLoop = async (cryptoCurrency, currency, chatId) => {
    let old_currency = await getCurrency(cryptoCurrency, currency)

    let current_currency = old_currency
    let percentage = (current_currency/ old_currency)


    setInterval(async () => {
        current_currency = await getCurrency(cryptoCurrency, currency)
        if (current_currency !== old_currency) {
            percentage = ((current_currency / old_currency) - 1) * 100
            if(percentage > 0){
                await telegram.sendMessage(chatId, `🟢 ${cryptoCurrency} ${current_currency}$ ⬆️ (${percentage}%)`)
            } else {
                await telegram.sendMessage(chatId, `🔴  ${cryptoCurrency} ${current_currency}$ ⬇️️ ( ${percentage}%)`)
            }
        }
        old_currency = current_currency
    }, 5000)



}



/**
const mainLoop = async () => {
    let old_currency = await getCurrencyToUSD('bitcoin')
    let current_currency = old_currency
    let percentage = (current_currency/ old_currency)
    console.log(percentage)
    console.log(current_currency)
    console.log(old_currency)
    setInterval(async () => {
        current_currency = await getCurrencyToUSD('bitcoin')
        if (current_currency !== old_currency) {
            percentage = ((current_currency / old_currency) - 1) * 100
            console.log({
                current_currency,
                percentage: percentage
            })
        }
        old_currency = current_currency
    }, 5000)
}

 */