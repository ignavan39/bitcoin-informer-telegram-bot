const { getAllCoins } = require("./getInfo");

const getIdCurrency = async (currency_name) => {
  const allCoins = await getAllCoins();
  currency_name = currency_name.toLowerCase();
  return allCoins.find((item) => item.symbol === currency_name).id;
};

module.exports = getIdCurrency;
