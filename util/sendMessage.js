export const sendMessages = async (coinId, currency, chatId) => {
    let data = fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    console.log(data)
}