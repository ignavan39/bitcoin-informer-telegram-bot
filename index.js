const {telegram} = require("./config/config");
const {bot} = require("./config/config")
const {mainLoop} = require("./controllers/setTitle.controller");
const {CronJob} = require("cron");
const {adminId} = require('./config/config')

//59 10 * * *
/*const job = new CronJob('37 18 * * *', async () => {
    let res = await fetchAllCoins()
    saveData(ALL_COINS, res)
    res = await fetchAllVsCurrencies()
    saveData(ALL_VS_CURRENCIES, res)
})*/

bot.hears(/(\w+) vs (\w+)/, (ctx) => {
  if (ctx.message.from.id === adminId) {
    if (!ctx.update.message.forward_from_chat) {
      ctx.reply("Перешлите сообщение из нужного канала");
    } else {
      let channelId = ctx.update.message.forward_from_chat.id;
      mainLoop(ctx.match[1], ctx.match[2], channelId);
    }
  }
});

bot.launch()

//job.start()
