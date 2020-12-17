
const { checkInAllCoins,
    checkInVsCurrency } = require("../servicies/checkExsistCurrency");


test('Check exsist vs currency', async () => {
    const data = await checkInVsCurrency('usd')
    expect(data).toBe(true)
})
test('Check vs currency BAD',async () => {
    const data = await checkInVsCurrency('usd1')
    expect(data).toBe(false)
})
test('Check exsist in all crypto coins', async () => {
    const data = await checkInAllCoins('bitcoin')
    expect(data).toBe(true)
})
