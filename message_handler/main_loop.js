const { getData } = require("../api_handler/get_pairs");
const { sendTitle, editTitle } = require("./title_message");
const { checkCurrency } = require("./check_currency");
const { getPostInfo } = require("./post_info.js");
const { sendPost, editPost } = require("./post_message");

const mainLoop = async (coin, vsCurrency, channelId) => {
  try {
    checkCurrency(coin, vsCurrency);
  } catch {
    throw "Нет такой валюты";
  }
  let coinInfo = await getData(coin);
  let prevMessageData = await sendTitle(coin, coinInfo, channelId);

  let postInfo = await getPostInfo(coin, vsCurrency);
  let prevPostId = await sendPost(postInfo, coinInfo, channelId);

  setInterval(async () => {
    coinInfo = await getData(coin);
    prevMessageData = await editTitle(
      coin,
      coinInfo,
      channelId,
      prevMessageData
    );
    postInfo = await getPostInfo(coin, vsCurrency);
    prevPostId = await editPost(postInfo, coinInfo, channelId, prevPostId);
  }, 6000);
};

module.exports = {
  mainLoop,
};
