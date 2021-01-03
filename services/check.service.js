const checkAllCoinsService = (allCoins, findCoin) => {
  if (!allCoins.find((item) => item.id === findCoin)) {
    throw "Валюта не найдена";
  }
};

const checkAllVsCurrencyService = (allVsCurrency, findCurrency) => {
  if (!allVsCurrency.find((item) => item === findCurrency)) {
    throw "Вторая валюта не найдена";
  }
};

module.exports = {
  checkAllCoinsService,
  checkAllVsCurrencyService,
};
