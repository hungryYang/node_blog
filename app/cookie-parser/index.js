//cookie
const cookie_parser = require('cookie')

//白名单
const whiteList = ['/name_hungryyang','/test']
module.exports = (ctx)=>{
    let {url} = ctx.req

    let {cookie} = ctx.req.headers
    let {res,resCtx} = ctx

    let cookieObj = cookie_parser.parse(cookie)
    return Promise.resolve({
        then:(resolve,reject)=>{
            if(url === '/logout'){
                res.setHeader('Set-Cookie',`authd=false;Max-Age=0}`)
                resCtx.hasUser = false
            }
            if(whiteList.indexOf(url) !== -1){
                res.setHeader('Set-Cookie','authd=true;Max-Age=3600')
            }
            if(cookieObj['authd']){
                resCtx.hasUser = true
                //时间延长
                res.setHeader('Set-Cookie','authd=true;Max-Age=3600')
            }
            resolve()
        }
    })
}