const fetch = require("node-fetch");

const fetchAllCoins = async () => {
  return await fetch(
    "https://api.coingecko.com/api/v3/coins/list"
  ).then((value) => value.json());
};

const getPostInfo = async (coin, vsCurrency) => {
  const allCoins = await fetchAllCoins();
  const currency_id = allCoins.find((item) => item.symbol === coin).id;
  const postInfo = await fetch(
    `https://api.coingecko.com/api/v3/coins/${currency_id}?` +
      `localization=false&tickers=false&market_data=true&community_data=false&` +
      `
    developer_data=false&sparkline=false`
  ).then((value) => value.json());
  return {
    name: postInfo.name,
    cap_place: postInfo.market_data.market_cap_rank,
    trading_volume: postInfo.market_data.total_volume[vsCurrency],
    cap: postInfo.market_data.market_cap[vsCurrency],
  };
};

module.exports = {
  getPostInfo,
};
