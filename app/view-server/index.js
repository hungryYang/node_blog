//映射表

//ejs动态渲染
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const urlrewriteMap = require('./urlrewrite')
module.exports = (ctx)=>{
    let {reqCtx,resCtx} = ctx
    let {pathname} = reqCtx
    Promise.resolve({
        then:(resolve,reject)=>{
            //过滤图片 ajax请求
            if(pathname.match('action')||pathname.match(/\./)){
                resolve()
            }else{
                let viewPath = path.resolve(__dirname,'ejs')
                let ejsName = urlrewriteMap[pathname]
                resCtx.active = pathname
                if(ejsName){
                    let layoutPath = path.resolve(viewPath,'layout.ejs')
                    let layoutHtml = fs.readFileSync(layoutPath,'utf8')

                    let render = ejs.compile(layoutHtml,{
                        compileDebug:true,
                        filename:layoutPath
                    })
                    let html = render({
                        viewName:ejsName,
                        hasUser:resCtx.hasUser,
                        active:resCtx.active
                    })
                    resCtx.headers = Object.assign(resCtx.headers,{
                        'Content-type':'text/html'
                    })
                    resCtx.body = html
                    resolve()
                }else{
                    //重定向
                    resCtx.headers = Object.assign(resCtx.headers,{
                        'Location':'/'
                    })
                    resCtx.statusCode = 302
                    resCtx.statusMessage = 'redirect'
                    resCtx.body = ''
                    resolve()
                }
            }

        }
    })
}