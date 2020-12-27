const { saveData, getData } = require("../common/savedata");
const {
  checkInAllCoins,
  checkInVsCurrency,
} = require("../servicies/checkExsistCurrency");
const { getAllCoins } = require("../servicies/getInfo");
const { ALL_COINS } = require("../types/keys");

test("Check exsist vs currency", async () => {
  const data = await checkInVsCurrency("usd");
  expect(data).toBe(true);
});
test("Check vs currency BAD", async () => {
  const data = await checkInVsCurrency("usd1");
  expect(data).toBe(false);
});
test("Check exsist in all crypto coins", async () => {
  const data = await checkInAllCoins("bitcoin");
  expect(data).toBe(true);
});

test("check save file and read", async () => {
  data = await getAllCoins();
  saveData(ALL_COINS, data);
  expect(JSON.parse(getData(ALL_COINS))).toEqual(data);
});
