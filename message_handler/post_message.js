const { bot } = require("../config/config.js");

const sendPost = async (postInfo, coinInfo, channelId) => {
  let postMessage = `${
    postInfo.name[0].toUpperCase() + postInfo.name.slice(1)
  } Price $${coinInfo.last} 
Market Cap $${postInfo.cap}
Trading Volume $${postInfo.trading_volume}
Market Cap Rank #${postInfo.cap_place}
——————————————
24h Low/ 24h High
$${coinInfo.last}/$${coinInfo.high}`;

  return bot.telegram
    .sendMessage(channelId, postMessage)
    .then((ctx) => ctx.message_id);
};

const editPost = async (postInfo, coinInfo, channelId, prevPostId) => {
  let isDeleted = bot.telegram
    .deleteMessage(channelId, prevPostId)
    .then((ctx) => ctx);
  if (isDeleted) {
    return await sendPost(postInfo, coinInfo, channelId);
  }
};

module.exports = {
  sendPost,
  editPost,
};
