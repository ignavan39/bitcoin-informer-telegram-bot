const { getData } = require("../api_handler/get_pairs");
const { sendTitle, editTitle } = require("./title_message");
const { checkCurrency } = require("./checkCurrency");

const mainLoop = async (coin, channelId) => {
  try {
    checkCurrency(coin);
  } catch {
    throw "Нет такой валюты";
  }
  let coinInfo = await getData(coin);
  let prevMessageData = await sendTitle(coin, coinInfo, channelId);

  setInterval(async () => {
    coinInfo = await getData(coin);
    editTitle(coin, coinInfo, channelId, prevMessageData);
  }, 3000);
};

module.exports = {
  mainLoop,
};
