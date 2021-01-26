const { bot, telegram } = require("./config/config");
const { adminId } = require("./config/config");
const { mainLoop } = require("./message_handler/main_loop");

bot.hears(/(\w+) vs (\w+)/, (ctx) => {
  if (ctx.message.from.id === adminId) {
    if (!ctx.update.message.forward_from_chat) {
      ctx.reply("Перешлите сообщение из нужного канала");
    } else {
      let channelId = ctx.update.message.forward_from_chat.id;
      try {
        mainLoop(ctx.match[1], channelId);
      } catch {
        ctx.reply("Такой валюты нет");
      }
    }
  }
});

bot.launch();
