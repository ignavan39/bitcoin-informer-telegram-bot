const fetch = require("node-fetch");
const {
  checkAllCoinsService,
  checkAllVsCurrencyService,
} = require("./check.service");

const fetchAllCoins = async () => {
  return await fetch(
    "https://api.coingecko.com/api/v3/coins/list"
  ).then((value) => value.json());
};

const fetchAllVsCurrencies = async () => {
  return await fetch(
    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
  ).then((value) => value.json());
};

const infoService = async (currency_name, vsCurrency) => {
  const allCoins = await fetchAllCoins();
  const allVsCurrency = await fetchAllVsCurrencies();
  currency_name = currency_name.toLowerCase();
  const currency_id = allCoins.find((item) => item.symbol === currency_name).id;
  try {
    checkAllCoinsService(allCoins, currency_id);
    checkAllVsCurrencyService(allVsCurrency, vsCurrency);
  } catch (e) {
    throw new e();
  }
  const rawRes = await fetch(
    `https://api.coingecko.com/api/v3/coins/${currency_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  ).then((value) => value.json());
  let res = await rawRes;
  return {
    name: res.name,
    cap_place: res.market_data.market_cap_rank,
    trading_volume: res.market_data.total_volume[vsCurrency],
    cap: res.market_data.market_cap[vsCurrency],
  };
};

module.exports = {
  infoService,
};
