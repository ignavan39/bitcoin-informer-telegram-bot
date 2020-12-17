require('dotenv').config()

const {Telegraf} = require('telegraf')
const {Telegram} = require("telegraf");
const bot_token = process.env.BOT_TOKEN
const bot = new Telegraf(bot_token)
const telegram = new Telegram(process.env["BOT_TOKEN"])
module.exports = {
    bot,
    telegram
}

