const {bot} = require("./config/config")
const express = require("express");
const {mainLoop} = require("./controllers/setTitleControllers");
const { CronJob } = require("cron");
const {getAllCoins,getAllvsCurrencies} = require("./servicies/getInfo")
const {client} = require('./config/config');
const { ALL_COINS, ALL_VS_CURRENCIES } = require("./types/keys");
//59 10 * * *
const job = new CronJob('59 10 * * *', async ()=>{
    await getAllCoins()
    await getAllvsCurrencies()
})
console.log(getAllCoins())
bot.hears(/(\w+) vs (\w+) to (-\d+)/, ctx => {
    mainLoop(ctx.match[1], ctx.match[2], ctx.match[3])
})
bot.launch()
job.start()
