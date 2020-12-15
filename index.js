const express = require("express");
const {bot} = require("./config/config")
const app = express();


bot.hears(/(\w+) vs (\w+) to -(\d+)/, ctx => {
    console.log(ctx.match)
})

const Telegram = require('telegraf/telegram')

const telegram = new Telegram(process.env["BOT_TOKEN"])

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

 */
