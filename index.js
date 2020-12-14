const {Telegraf} = require("telegraf");
const express = require('express');
const app = express();
const Telegram = require('telegraf/telegram')
require('dotenv').config()

const bot = new Telegraf(process.env["BOT_TOKEN"])
bot.launch()

const telegram = new Telegram(process.env["MY_TOKEN"])
telegram.sendMessage('603121011', 'message')




