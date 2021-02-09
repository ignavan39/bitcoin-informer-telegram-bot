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
$${coinInfo.low}/$${coinInfo.high}`

  return bot.telegram
    .sendMessage(channelId, postMessage)
    .then((ctx) => ({ message_id: ctx.message_id, text: ctx.text }));
};

const editPost = async (postInfo, coinInfo, channelId, prevPostData) => {
  let postMessage = `${
    postInfo.name[0].toUpperCase() + postInfo.name.slice(1)
  } Price $${coinInfo.last} 
Market Cap $${postInfo.cap}
Trading Volume $${postInfo.trading_volume}
Market Cap Rank #${postInfo.cap_place}
——————————————
24h Low/ 24h High
$${coinInfo.low}/$${coinInfo.high}`
  if(postMessage !== prevPostData.text){
    return await bot.telegram.editMessageText(channelId, prevPostData.message_id, undefined, postMessage)
      .then((ctx) => ({ message_id: ctx.message_id, text: postMessage }))
  }
  return prevPostData;
};

module.exports = {
  sendPost,
  editPost,
};
