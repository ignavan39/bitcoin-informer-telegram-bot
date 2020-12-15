const {bot} = require("./config/config")
const express = require("express");
const {mainLoop} = require("./controllers/controllers");

const app = express();

bot.hears(/(\w+) vs (\w+) to (-\d+)/, ctx => {
    mainLoop(ctx.match[1], ctx.match[2], ctx.match[3])
})
bot.launch()
