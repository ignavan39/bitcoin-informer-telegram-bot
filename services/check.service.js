const checkAllCoinsService = (allCoins,findCoin) => {
    if(!allCoins.find(item=>item.id===findCoin)){
        console.log('Валюта не найдена')
        throw new 'Валюта не найдена'
    }
}

const checkAllVsCurrencySercice = (allVsCurrency,findCurrency) => {
    if(!allVsCurrency.find((item) => item === findCurrency)){
        console.log(' Валюта не найдена')
        throw new 'Вторая валюта не найдена'
    }
}

module.exports = {
    checkAllCoinsService,
    checkAllVsCurrencySercice
}