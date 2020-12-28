const fetch = require("node-fetch");
const {
  checkAllCoinsService,
  checkAllVsCurrencySercice,
} = require("./check.service");

const fetchAllCoins = async () => {
  const rawRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
  return await rawRes.json();
};

const fetchAllVsCurrencies = async () => {
  const rawRes = await fetch(
    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
  );
  return await rawRes.json();
};

const currencyService = async (currency_name, vsCurrency) => {
  const allCoins = await fetchAllCoins();
  const allVsCurrency = await fetchAllVsCurrencies();

  currency_name = currency_name.toLowerCase();
  const currency_id = allCoins.find((item) => item.symbol === currency_name).id;
  try {
    checkAllCoinsService(allCoins, currency_id);
    checkAllVsCurrencySercice(allVsCurrency, vsCurrency);
  } catch (e) {
    throw new e();
  }

  const rawRes = await fetch(
    `https://api.coingecko.com/api/v3/coins/${currency_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );
  let res = await rawRes.json();
  res = {
    name: res.name,
    price: res.market_data.current_price[vsCurrency],
    percentage:
      res.market_data.price_change_percentage_24h_in_currency[vsCurrency],
    allInfo: { ...res.market_data },
  };

  return res;
};

module.exports = {
  currencyService,
};
