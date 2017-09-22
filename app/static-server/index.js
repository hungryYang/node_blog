const path = require('path')
const fs = require('fs')

let getPath = url=> path.resolve(process.cwd(),`public`,`.${url}`)
let staticServer = (ctx)=>{
    let {url} = ctx.req
    let {resCtx} = ctx
    return new Promise((resolve,reject)=>{
        if(!url.match('action')){
            if(url === '/'){
                url='/index.html'
            }
            let _path = getPath(url)
            //readFile 和 end encoding保持一致
            let body = fs.readFile(_path,(err,data)=>{

                if(err){
                    resCtx.body = `NOT FOUND ${err.stack}`
                }
                resCtx.body = data
                resolve()
            })
        }else {
            resolve()
        }

    })
}
module.exports = staticServer