const { getData } = require("../api_handler/get_pairs")

const mainLoop = async(coin,channelId) => {
    const data = await getData(coin);
    
    setInterval(()=>{

    },3000)
}