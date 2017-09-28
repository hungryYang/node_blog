const path = require('path')
const fs = require('fs')
const mime =require('mime')
let getPath = url=> path.resolve(process.cwd(),`public`,`.${url}`)
let staticServer = (ctx)=>{
    let {url} = ctx.req
    let {resCtx} = ctx
    return new Promise((resolve,reject)=>{
        if(url.match(/\./)&&!url.match('action')){
            let _path = getPath(url)
            //readFile 和 end encoding保持一致
            resCtx.headers = Object.assign(resCtx.headers,{
                'Content-type':mime.getType(_path)
            })
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