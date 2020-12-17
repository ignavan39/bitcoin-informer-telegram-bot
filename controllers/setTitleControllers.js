const getIdCurrency = require("../servicies/getIdCurrency");
const sendPostController = require("./sendPostController");
const {telegram} = require("../config/config");
const {getCurrency} = require("../servicies/getCurrency");

const mainLoop = async (currency, vs_currency, chatId) => {

    let marketData = await getCurrency(await getIdCurrency(currency), vs_currency)
    chatId = parseInt(chatId)
    if (!marketData) {
        await telegram.sendMessage(`Некоректное название валют`, chatId)
        return;
    }

    let percentage = marketData.percentage
    let currentCurrency = marketData.price
    let previousMessageID = -1
    let messageID = -1
    let timer = 0
    let prevPrice = -1

    setInterval(async () => {

        marketData = await getCurrency(await getIdCurrency(currency), vs_currency);
        percentage = marketData.percentage
        currentCurrency = marketData.price

        if (!marketData) {
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
            if (percentage > 0) {
                await telegram.setChatTitle(chatId, `🟢 ${currency.toUpperCase()} ${currentCurrency}$ ⬆️ (+${percentage}%|24h)`)
                    .then(() => {
                        if (prevPrice !== currentCurrency) {
                            telegram.deleteMessage(chatId, messageID + 1)
                        }
                    })
            } else {
                await telegram.setChatTitle(chatId, `🔴 ${currency.toUpperCase()} ${currentCurrency}$ ⬇️️ (-${percentage}%|24h)`)
                    .then(() => {
                        if (prevPrice !== currentCurrency) {
                            telegram.deleteMessage(chatId, messageID + 1)
                        }
                    })
            }
            prevPrice = currentCurrency
        }
    }, 5000);
};

module.exports = {mainLoop}