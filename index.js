const {ALL_VS_CURRENCIES, ALL_COINS} = require("./types/keys");
const {fetchAllVsCurrencies} = require("./servicies/getInfo");
const {fetchAllCoins} = require("./servicies/getInfo");
const {saveData} = require("./common/savedata");
const {bot} = require("./config/config")
const {mainLoop} = require("./controllers/setTitleControllers");
const {CronJob} = require("cron");

//59 10 * * *
const job = new CronJob('37 18 * * *', async () => {
    let res = await fetchAllCoins()
    saveData(ALL_COINS, res)
    res = await fetchAllVsCurrencies()
    saveData(ALL_VS_CURRENCIES, res)
})

bot.hears(/(\w+) vs (\w+) to (-\d+)/, ctx => {
    mainLoop(ctx.match[1], ctx.match[2], ctx.match[3])
})

bot.launch()

job.start()

