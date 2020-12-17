const { bot } = require("./config/config")
const { mainLoop } = require("./controllers/setTitleControllers");
const { CronJob } = require("cron");
const { ALL_COINS, ALL_VS_CURRENCIES } = require('./types/keys')
const { saveData, getData } = require("./common/savedata");
const { fetchAllCoins, fetchAllvsCurrencies } = require("./servicies/getInfo");
//59 10 * * *
const job = new CronJob('37 18 * * *', async () => {
    let res = await fetchAllCoins()
    saveData(ALL_COINS,res)
    res = await fetchAllvsCurrencies()
    saveData(ALL_VS_CURRENCIES,res)
})

/*bot.hears(/(\w+) vs (\w+) to (-\d+)/, ctx => {
    mainLoop(ctx.match[1], ctx.match[2], ctx.match[3])
})
bot.launch()*/

//-313399538
job.start()
