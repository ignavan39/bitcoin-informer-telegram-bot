const getIdCurrency = require("../servicies/getIdCurrency");
const sendPostController = require("./sendPostController");
const {telegram} = require("../config/config");
const {getCurrency} = require("../servicies/getCurrency");
const {checkInAllCoins, checkInVsCurrency} = require("../servicies/checkExsistCurrency")

const mainLoop = async (currency, vs_currency, channelId) => {
    let hasCurrency = await checkInAllCoins(currency)
    if(!hasCurrency){
        await telegram.sendMessage(channelId, 'Неверное название криптовалюты')
        return;
    }
    let hasVsCurrency = await checkInVsCurrency(vs_currency)
    if(!hasVsCurrency){
        await telegram.sendMessage(channelId, 'Неверно введено название второй валюты')
        return;
    }

    let marketData = await getCurrency(await getIdCurrency(currency), vs_currency)
    if(!marketData){
        await telegram.sendMessage(channelId, 'Не удалось сделать запрос к сервису')
        return
    }

    let percentage = marketData.percentage
    let currentCurrency = marketData.price
    let prevCurrency = marketData.price
    let nowPercentage = -1
    let previousMessageID = -1
    let messageID = -1
    let timer = 0

    setInterval(async () => {
        marketData = await getCurrency(await getIdCurrency(currency), vs_currency);
        percentage = marketData.percentage.toFixed(2)

        currentCurrency = marketData.price

        if (!marketData) {
            await telegram.sendMessage(channelId, 'Не удалось сделать запрос к сервису')
            clearInterval(this)
            return;
        }

        previousMessageID = messageID

        messageID = await sendPostController(marketData, vs_currency, channelId)

        for(let i = previousMessageID; i < messageID && previousMessageID !== -1; i++){
            await telegram.deleteMessage(channelId, i)
        }

        timer++;
        if (timer === 12) {
            timer = 0
            if(prevCurrency !== currentCurrency){
                nowPercentage = (currentCurrency/prevCurrency - 1)
                let newTitle = `${nowPercentage > 0 ? '🟢': '🔴'}${currency.toUpperCase()} ${currentCurrency}$ ` +
                `${percentage > 0 ? `⬆️ (+${percentage}`: `⬇️(${percentage}`}%|24h)`
                await telegram.setChatTitle(channelId, newTitle)
                prevCurrency = currentCurrency
            }
        }

    }, 5000);
};

module.exports = {mainLoop}
