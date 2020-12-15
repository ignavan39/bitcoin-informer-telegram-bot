const express = require("express");
const {bot} = require("./config/config")
const Telegram = require('telegraf/telegram')
const {mainLoop} = require("./controllers/controllers");

const app = express();

bot.hears(/(\w+) vs (\w+) to (-\d+)/, ctx => {
    mainLoop(ctx.match[1], ctx.match[2], ctx.match[3])
})
bot.launch()



/*
const changeTitleByExchange = (chatId, title) => {
    telegram.setChatTitle(chatId, title)
}


telegram.setChatTitle('-455245562','1234212')
telegram.sendMessage('-455245562', 'message')
telegram.getChat('-455245562').then(
    ctx => console.log(ctx)
)
telegram.getUpdates().then(ctx => console.log(ctx))


const express = require('express');
const { coinGeckoClient } = require("./config/config")
*/
