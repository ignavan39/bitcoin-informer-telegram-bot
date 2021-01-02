const getIdCurrency = require("../servicies/getIdCurrency");
const sendPostController = require("./sendPostController");
const {getCurrentCurrency} = require("../servicies/getCurrentPrice");
const {telegram} = require("../config/config");
const {getCurrency} = require("../servicies/getCurrency");
const {checkInAllCoins, checkInVsCurrency} = require("../servicies/checkExsistCurrency")

const mainLoop = async (currency, vs_currency, channelId) => {
    let hasCurrency = await checkInAllCoins(currency)
    if(!hasCurrency){
        await telegram.sendMessage(channelId, 'Неверное название криптовалюты')
        return
    }

    let hasVsCurrency = await checkInVsCurrency(vs_currency)
    if(!hasVsCurrency){
        await telegram.sendMessage(channelId, 'Неверно введено название второй валюты')
        return
    }

    let marketData = await getCurrency(await getIdCurrency(currency), vs_currency)
    if(!marketData){
        await telegram.sendMessage(channelId, 'Не удалось сделать запрос к сервису')
        return
    }

    let prices24h = await getCurrentCurrency(currency, vs_currency)
    if(!prices24h){
        await telegram.sendMessage(channelId, 'Не удалось сделать запрос к сервису')
        return
    }

    let currentCurrency = prices24h.lastPrice
    let prevCurrency = prices24h.lastPrice
    let nowPercentage = -1
    let newTitle = ''
    let timer = 0
    let haveNewTitle = false
    let percentage = marketData.percentage
    let prevPercentage = -1

    setInterval(async () => {
        marketData = await getCurrency(await getIdCurrency(currency), vs_currency);

        if (!marketData) {
            await telegram.sendMessage(channelId, 'Не удалось сделать запрос к сервису')
            clearInterval(this)
            return
        }

        prices24h = await getCurrentCurrency(currency, vs_currency)

        if(!prices24h){
            await telegram.sendMessage(channelId, 'Не удалось сделать запрос к сервису')
            clearInterval(this)
            return
        }

        currentCurrency = prices24h.lastPrice
        percentage = marketData.percentage.toFixed(2)

        await sendPostController(marketData, prices24h, channelId)
            .then((id) => {
                telegram.deleteMessage(channelId, id-1)
                if(haveNewTitle){
                    telegram.deleteMessage(channelId, id-2)
                    haveNewTitle = false
                }
            })

        timer++
        if (timer === 12) {
            timer = 0
            if(currentCurrency !== prevCurrency || prevPercentage !== percentage){
                nowPercentage = (currentCurrency/prevCurrency - 1)
                newTitle = `${nowPercentage > 0 ? '🟢': '🔴'}${currency.toUpperCase()} ${currentCurrency}$ `
                newTitle += `${percentage > 0 ? `⬆️ (+${percentage}`: `⬇️(${percentage}`}%|24h)`
                await telegram.setChatTitle(channelId, newTitle)
                haveNewTitle = true
            }
            prevCurrency = currentCurrency
            prevPercentage = percentage
        }
    }, 5000);
};

module.exports = {mainLoop}
