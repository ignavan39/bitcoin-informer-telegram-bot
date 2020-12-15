require('dotenv').config()

const { Telegraf } = require('telegraf')
const CoinGecko = require('coingecko-api')
const coinGeckoClient = new CoinGecko()
const bot_token = process.env.BOT_TOKEN
const test_channel = process.env.TEST
const bot = new Telegraf(bot_token)
const telegram = new Telegram(process.env["BOT_TOKEN"])


module.exports = {
    bot,
    telegram
    test_channel,
    coinGeckoClient
}