const { bot } = require("./config/config");
const { adminId } = require("./config/config");

bot.hears(/(\w+) vs (\w+)/, (ctx) => {
  if (ctx.message.from.id === adminId) {
    if (!ctx.update.message.forward_from_chat) {
      ctx.reply("Перешлите сообщение из нужного канала");
    } else {
      let channelId = ctx.update.message.forward_from_chat.id;
      
     // mainLoop(ctx.match[1], ctx.match[2], channelId);
    }
  }
});

bot.launch();
