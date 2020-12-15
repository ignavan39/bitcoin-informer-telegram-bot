# bitcoin-informer-telegram-bot


### How to start ?

Clone this repo or fork
```
$ yarn
```
or 
```
$ npm install
```

#### Development :
```
$ yarn start:dev
```

#### Production :

```
sh deploy.sh
$ yarn start
```


### API 

utils/filterByCoinName:
* currencyNameToCoin(currency_name) : coin id

utils/getCurrency:
* getCurrency = async (currency_id,vsCurrency) : returns the current price of the currency from the ID(currency_id) versus vsCurrency

controllers/controller.js
* mainLoop(coinName,vsCurrency)
