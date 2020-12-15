require('dotenv').config()
const { Telegraf } = require('telegraf')

const bot_token = process.env.BOT_TOKEN
const bot = new Telegraf(bot_token)

module.exports = {
    bot
}