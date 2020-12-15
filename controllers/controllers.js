const { bot, test_channel } = require("../config/config");
const { getCurrency } = require("../util/getCurrency");
const { currencyNameToCoin  } = require("../util/filterByCoinName")
const mainLoop = async (currency,vs_currency) => {
    let old_currency = await getCurrency(await currencyNameToCoin(currency),vs_currency);
    let current_currency = old_currency;
    let percentage = current_currency / old_currency;

    console.log(percentage);
    console.log(current_currency);
    console.log(old_currency);
    setInterval(async () => {
      current_currency = await getCurrency(await currencyNameToCoin(currency),vs_currency);
      if (current_currency !== old_currency) {
        percentage = (current_currency / old_currency - 1) * 100;
        console.log({
          current_currency,
          percentage: percentage,
        });
      }
      old_currency = current_currency;
    }, 5000);
  };

  module.exports = {mainLoop}
