//处理客户端数据
//处理 url  query body method

module.exports = (ctx)=>{
    let {method,context} = ctx.req
    let {reqCtx} = ctx
    method = method.toLowerCase()
    return Promise.resolve({
        then:(resolve,reject)=>{
            if(method === 'post'){
                let data = []
                //request 原型链  readable stream eventemitter
                //paused stream ===> flow stream
                //仓库 ==> 拿出来 ==>end  仓库清空内存释放
                ctx.req.on('data',(chunk)=>{
                    data.push(chunk)
                }).on('end',()=>{
                    let endData = Buffer.concat(data).toString()
                    reqCtx.body = JSON.parse(endData)
                    resolve()
                })
            }else{
                resolve()
            }
        }
    })
}