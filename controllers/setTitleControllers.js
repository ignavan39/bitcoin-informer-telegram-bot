const getIdCurrency = require("../servicies/getIdCurrency");
const sendPostController = require("./sendPostController");
const {telegram} = require("../config/config");
const {getCurrency} = require("../servicies/getCurrency");
const {checkInAllCoins, checkInVsCurrency} = require("../servicies/checkExsistCurrency")

const mainLoop = async (currency, vs_currency, chatId) => {
    let hasCurrency = await checkInAllCoins(currency)
    if(!hasCurrency){
        await telegram.sendMessage(chatId, 'Неверное название криптовалюты')
        return;
    }
    let hasVsCurrency = await checkInVsCurrency(vs_currency)
    if(!hasVsCurrency){
        await telegram.sendMessage(chatId, 'Неверно введено название второй валюты')
        return;
    }

    let marketData = await getCurrency(await getIdCurrency(currency), vs_currency)
    if(!marketData){
        await telegram.sendMessage(chatId, 'Не удалось сделать запрос к сервису')
        return
    }

    let percentage = marketData.percentage
    let currentCurrency = marketData.price
    let previousMessageID = -1
    let messageID = -1
    let timer = 0

    setInterval(async () => {
        marketData = await getCurrency(await getIdCurrency(currency), vs_currency);
        percentage = marketData.percentage.toFixed(2)
        currentCurrency = marketData.price.toFixed(2)

        if (!marketData) {
            await telegram.sendMessage(chatId, 'Не удалось сделать запрос к сервису')
            clearInterval(this)
            return;
        }

        previousMessageID = messageID

        messageID = await sendPostController(marketData, vs_currency, chatId)

        if (previousMessageID !== -1) {
            await telegram.deleteMessage(chatId, previousMessageID)
        }

        timer++;
        if (timer === 12) {
            timer = 0
            let title = (await telegram.getChat(chatId)).title
            if (percentage > 0) {
                let newTitle = `🟢 ${currency.toUpperCase()} ${currentCurrency}$ ⬆️ (+${percentage}%|24h)`
                if(title !== newTitle){
                    await telegram.setChatTitle(chatId, newTitle)
                        .then(() => telegram.deleteMessage(chatId, messageID+1))
                }
            } else {
                let newTitle = `🔴 ${currency.toUpperCase()} ${currentCurrency}$ ⬇️️(${percentage}%|24h)`
                if(title !== newTitle){
                    await telegram.setChatTitle(chatId, newTitle)
                        .then(() => telegram.deleteMessage(chatId, messageID+1))
                }
            }
        }
    }, 5000);
};

module.exports = {mainLoop}