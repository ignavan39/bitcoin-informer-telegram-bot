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
  if (newTitle !== prevMessageData.text) {
    return bot.telegram
      .editMessageText(
        channelId,
        prevMessageData.message_id,
        undefined,
        newTitle
      )
      .then((ctx) => ({ message_id: ctx.message_id, text: newTitle }));
  }
  return prevMessageData;
};

module.exports = {
  sendTitle,
  editTitle,
};
