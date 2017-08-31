const fs = require('fs')
const path = require('path')
class App{
    constructor(){

    }
    initServer(req,res){
        return (req,res)=>{
            fs.readFile(path.resolve(__dirname,('../public/index.html')),'utf8',(err,data)=>{
                res.end(data)
            })
        }
    }
}

module.exports = App