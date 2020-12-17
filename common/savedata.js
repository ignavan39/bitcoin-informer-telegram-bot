const fs = require('fs')

const saveData = (name, data) => {
     fs.writeFileSync(name + '.json', JSON.stringify(data), 'utf-8', (err) => {
        if(err){
            console.log(err)
        }
        return;
    })
}

const getData = (name) => {
    try{
        return fs.readFileSync(name + '.json', 'utf8')
    } catch (err){
        return null
    }
}

module.exports = {
    saveData,
    getData
}