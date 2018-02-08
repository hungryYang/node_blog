const path = require('path')
const fs = require('fs')
const mime =require('mime')
const public = `node_blog_fe`
let getPath = pathname=> path.resolve(process.cwd(),public,`.${pathname}`)
let staticServer = (ctx)=>{
    let {pathname} = ctx.reqCtx
    let {resCtx} = ctx
    return new Promise((resolve,reject)=>{
        if(pathname.match(/\./)&&!pathname.match('action')){
            let _path = getPath(pathname)
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