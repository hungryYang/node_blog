

module.exports = (ctx)=>{
    let {url,method} = ctx.req
    let {resCtx,reqCtx} = ctx
    //返回数组 或 undefined
    let {res} = ctx
    method = method.toLowerCase()
    let test = {
        '/user.action':['hello','world','aa'],
        '/list.action':['wo','cao','ni']
    }
    return Promise.resolve({
        then:(resolve,reject)=>{
            if(url.match('action')){
                if(method == 'get'){
                    resCtx.body = JSON.stringify(test[url])
                }else{
                    let body = reqCtx.body
                    resCtx.body =  JSON.stringify(body)
                }
                resCtx.headers = Object.assign(resCtx.headers,{'Content-type':'application/json'})
            }

            resolve()
        }
    })
}