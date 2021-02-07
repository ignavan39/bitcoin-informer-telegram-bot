const { bot } = require("../config/config");

const sendTitle = async (coin, data, channelId) => {
  let percent24h = (data.last / data.open - 1) * 100;
  let newTitle =
    `${data.last_change > 0 ? "🟢" : "🔴"}${coin.toUpperCase()} ${data.last}$` +
    ` (${percent24h > 0 ? "⬆️" : "⬇️"}${percent24h.toFixed(2)}%|24h)`;

  return bot.telegram
    .sendMessage(channelId, newTitle)
    .then((ctx) => ({ message_id: ctx.message_id, text: newTitle }));
};

const editTitle = async (coin, data, channelId, prevMessageData) => {
  let percent24h = (data.last / data.open - 1) * 100;
  let newTitle =
    `${data.last_change > 0 ? "🟢" : "🔴"}${coin.toUpperCase()} ${data.last}$` +
    ` (${percent24h > 0 ? "⬆️" : "⬇️"}${percent24h.toFixed(2)}%|24h)`;
  if (newTitle !== prevMessageData.text){
    let isDeleted = await bot.telegram.deleteMessage(channelId, prevMessageData.message_id)
    .then(ctx => ctx)
    if(isDeleted){
      return bot.telegram.sendMessage(channelId, newTitle)
      .then((ctx) => ({ message_id: ctx.message_id, text: newTitle }))
    }
    return "Произошла ошибка на серверах telegram"
  }
  return prevMessageData
}

module.exports = {
  sendTitle,
  editTitle,
};
