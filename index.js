const {bot} = require("./config/config")
const {mainLoop} = require("./controllers/setTitleControllers");
const { CronJob } = require("cron");
const { getAllCoins, getAllvsCurrencies } = require("./servicies/getInfo");
//59 10 * * *
const job = new CronJob('26 12 * * *', async ()=>{
    await getAllCoins()
    await getAllvsCurrencies()
})

bot.hears(/(\w+) vs (\w+) to (-\d+)/, ctx => {
    mainLoop(ctx.match[1], ctx.match[2], ctx.match[3])
})
bot.launch()
job.start()
