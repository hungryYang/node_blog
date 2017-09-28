//映射表

//ejs动态渲染
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
module.exports = (ctx)=>{
    let {req,resCtx} = ctx
    let {url} = req
    Promise.resolve({
        then:(resolve,reject)=>{
            let urlMap = {
                '/':{
                    viewName:'index.html'
                },
                '/about':{
                    viewName:'about.html'
                }
            }
            let viewPath = path.resolve(process.cwd(),'public')
            if(urlMap[url]){
                let {viewName} = urlMap[url]
                let htmlPath =  path.resolve(viewPath,viewName)
                let render = ejs.compile(fs.readFileSync(htmlPath,'utf8'),{
                    compileDebug:true
                })

                resCtx.body = render()
                resolve()
            }else{
                resolve
            }

        }
    })
}