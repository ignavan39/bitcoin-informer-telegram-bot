require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot_token = process.env.BOT_TOKEN;
const test_channel = process.env.TEST;

const bot = new Telegraf(bot_token);

const CoinGecko = require("coingecko-api");
const coinGeckoClient = new CoinGecko();

module.exports = {
  bot,
  test_channel,
  coinGeckoClient,
};
