const { bot, telegram } = require("../config/config");

const sendTitle = async (data, channelId) => {
  return await telegram.sendMessage(
    channelId,
    data.last_change > 0
      ? `🟢${data.last}⬆️ (${parseFloat(data.last_change / data.last).toFixed(
          2
        )})`
      : `🔴${data.last}⬇️ (${parseFloat(data.last_change / data.last).toFixed(
          2
        )})`
  );
};
