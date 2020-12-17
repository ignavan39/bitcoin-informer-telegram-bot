const { getAllCoins } = require("./getInfo")

const checkInAllCoins = async (coinName) => {
    let allCoins = await getAllCoins()
    allCoins =   JSON.parse(allCoins)
    console.log(`ALL COINS : ${allCoins}`)
    const res = allCoins.find(item => item.id === coinName)
    if(!res){
        return false
    }
    return true
}

module.exports ={
    checkInAllCoins
}