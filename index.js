const express = require("express");
const { coinGeckoClient } = require("./config/config");
const { getCurrency } = require("./util/getCurrency");
const {mainLoop} = require("./controllers/controllers")

mainLoop('btc','usd')