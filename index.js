const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const {bot_token} = require("./config/config")

app.listen(PORT, () => {
    console.log(`Server startred on port ${PORT}`)
});