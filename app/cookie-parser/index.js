//cookie
const cookie_parser = require('cookie')

//白名单
const whiteList = ['/name_hungryyang','/test']
module.exports = (ctx)=>{
    let {pathname} = ctx.reqCtx
    let {res,resCtx} = ctx

    let {cookie} = ctx.req.headers

    let cookieObj = cookie_parser.parse(cookie)
    return Promise.resolve({
        then:(resolve,reject)=>{
            if(whiteList.indexOf(pathname) !== -1){
                res.setHeader('Set-Cookie','authd=true;Max-Age=3600')
            }
            if(cookieObj['authd']){
                resCtx.hasUser = true
                //时间延长
                res.setHeader('Set-Cookie','authd=true;Max-Age=3600')
            }
            if(pathname === '/logout'){
                res.setHeader('Set-Cookie',`authd=false;Max-Age=0}`)
                resCtx.hasUser = false
            }
            resolve()
        }
    })
}