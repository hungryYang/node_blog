//映射表

//ejs动态渲染
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const urlrewriteMap = require('./urlrewrite')
module.exports = (ctx)=>{
    let {req,resCtx} = ctx
    let {url} = req
    Promise.resolve({
        then:(resolve,reject)=>{
            //过滤图片 ajax请求
            if(url.match('action')||url.match(/\./)){
                resolve()
            }else{
                let viewPath = path.resolve(__dirname,'ejs')
                let ejsName = urlrewriteMap[url]
                if(ejsName){
                    let layoutPath = path.resolve(viewPath,'layout.ejs')
                    let layoutHtml = fs.readFileSync(layoutPath,'utf8')

                    let render = ejs.compile(layoutHtml,{
                        compileDebug:true,
                        filename:layoutPath
                    })
                    let html = render({
                        templateName:ejsName,
                        hasUser:resCtx.hasUser
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