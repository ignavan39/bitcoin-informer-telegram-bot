const { telegram } = require("../config/config");

const sendPostController = async (info, vsCurrency, chatId) => {
    return await telegram
        .sendMessage(
            chatId,
            `${info.name[0].toUpperCase() + info.name.slice(1)} Price $${info.price}
Market Cap $${info.allInfo.market_cap[vsCurrency]} 
Trading Volume $${info.allInfo.total_volume[vsCurrency]}      
Market Cap Rank #${info.allInfo.market_cap_rank}
——————————————
24h Low/ 24h High
$${info.allInfo.low_24h[vsCurrency]}/$${info.allInfo.high_24h[vsCurrency]}
`)
        .then((ctx) => ctx.message_id);
};


module.exports = sendPostController;
