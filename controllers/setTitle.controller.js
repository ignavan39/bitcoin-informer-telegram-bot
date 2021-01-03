const sendPostController = require("./sendPost.controller");
const {getCurrentPrice} = require("../services/getCurrentPrice.service");
const {infoService} = require("../services/currencyInfo.service");
const {telegram} = require("../config/config");

const mainLoop = async (currency, vs_currency, channelId) => {
    try {

        let marketData = await infoService(currency, vs_currency)
        let prices24h = await getCurrentPrice(currency, vs_currency)
        let currentCurrency = prices24h.lastPrice
        let prevCurrency = prices24h.lastPrice
        let nowPercentage = -1
        let newTitle = ''
        let timer = 0
        let haveNewTitle = false
        let percentage = prices24h.percentage
        let prevPercentage = -1

        setInterval(async () => {
            try {
                prices24h = await getCurrentPrice(currency, vs_currency)
            } catch {
                await telegram.sendMessage(channelId, "Не удалось сделать запрос к сервису");
            }
            try {
                marketData = await infoService(currency, vs_currency)
            } catch {
                await telegram.sendMessage(channelId, "Не удалось сделать запрос к сервису");
            }

            await sendPostController(marketData, prices24h, channelId)
                .then(id => {
                    telegram.deleteMessage(channelId, id - 1)
                    if (haveNewTitle) {
                        telegram.deleteMessage(channelId, id - 2)
                        haveNewTitle = false
                    }
                })

            timer++
            if (timer === 2) {
                timer = 0
                currentCurrency = prices24h.lastPrice
                percentage = parseFloat(prices24h.percentage).toFixed(2)
                if (currentCurrency !== prevCurrency || prevPercentage !== percentage) {
                    nowPercentage = (currentCurrency / prevCurrency - 1)
                    newTitle = `${nowPercentage > 0 ? '🟢' : '🔴'}${currency.toUpperCase()} ${currentCurrency}$ `
                    newTitle += `${percentage > 0 ? `⬆️ (+${percentage}` : `⬇️(${percentage}`}%|24h)`
                    await telegram.setChatTitle(channelId, newTitle)
                    haveNewTitle = true
                }
                prevCurrency = currentCurrency
                prevPercentage = percentage
            }

        }, 5000)

    } catch {
        await telegram.sendMessage(channelId, "Не удалось сделать запрос к сервису")
    }
};

module.exports = {mainLoop};
