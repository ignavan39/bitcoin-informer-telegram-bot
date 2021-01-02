const { telegram } = require("../config/config");

const sendPostController = async (info, prices24h, chatId) => {
    return await telegram.sendMessage(chatId,
`${info.name[0].toUpperCase() + info.name.slice(1)} Price $${prices24h.lastPrice}
Market Cap $${info.cap} 
Trading Volume $${info.trading_volume}      
Market Cap Rank #${info.cap_place}
——————————————
24h Low/ 24h High
$${prices24h.lowPrice}/$${prices24h.highPrice}`)
        .then((ctx) => ctx.message_id)
        .catch(undefined);
};


module.exports = sendPostController;
