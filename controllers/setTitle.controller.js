const sendPostController = require("./sendPost.controller");
const { telegram } = require("../config/config");
const { currencyService } = require("../services/currency.service");

const mainLoop = async (currency, vs_currency, channelId) => {
  try {
    let marketData = await currencyService(currency, vs_currency);

    let percentage = marketData.percentage;
    let currentCurrency = marketData.price;
    let prevCurrency = marketData.price;
    let nowPercentage = -1;
    let previousMessageID = -1;
    let messageID = -1;
    let timer = 0;

    setInterval(async () => {
      try {
        marketData = await currencyService(currency, vs_currency);
      } catch {
        await telegram.sendMessage(
          channelId,
          "Не удалось сделать запрос к сервису"
        );
        return;
      }
      percentage = marketData.percentage.toFixed(2);

      currentCurrency = marketData.price;
      previousMessageID = messageID;

      messageID = await sendPostController(marketData, vs_currency, channelId);

      for (
        let i = previousMessageID;
        i < messageID && previousMessageID !== -1;
        i++
      ) {
        await telegram.deleteMessage(channelId, i);
      }

      timer++;
      if (timer === 12) {
        timer = 0;
        if (prevCurrency !== currentCurrency) {
          nowPercentage = currentCurrency / prevCurrency - 1;
          let newTitle =
            `${
              nowPercentage > 0 ? "🟢" : "🔴"
            }${currency.toUpperCase()} ${currentCurrency}$ ` +
            `${
              percentage > 0 ? `⬆️ (+${percentage}` : `⬇️(${percentage}`
            }%|24h)`;
          await telegram.setChatTitle(channelId, newTitle);
          prevCurrency = currentCurrency;
        }
      }
    }, 5000);
  } catch {
    await telegram.sendMessage(
      channelId,
      "Не удалось сделать запрос к сервису"
    );
    return;
  }
};

module.exports = { mainLoop };
