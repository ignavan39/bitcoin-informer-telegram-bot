const {bot,test_channel} = require('../config/config')
const { getCurrencyToUSD } = require('./util/getCurrency')

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