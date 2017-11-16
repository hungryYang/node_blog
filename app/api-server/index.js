let Router = require('./ajax')
module.exports = (ctx)=>{
    let {resCtx,reqCtx} = ctx
    let {pathname,method} = reqCtx
    
    //返回数组 或 undefined
    let {res} = ctx
   
    return Promise.resolve({
        then:(resolve,reject)=>{
            if(pathname.match('action')){
                return Router.routes(ctx).then(val=>{
                    resCtx.body =  JSON.stringify(val)
                    resCtx.headers = Object.assign(resCtx.headers,{'Content-type':'application/json'})
                    resolve()
                })
            }
            resolve()
        }
    })
}