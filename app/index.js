const fs = require('fs')
const path = require('path')
const apiServer = require('./api-server')
const urlParser = require('./url-parser')
const staticServer = require('./static-server')
class App{
    constructor(){
        this.middlewareArr = []
        this.middlewareChain = Promise.resolve()
    }
    use(middleware){
        this.middlewareArr.push(middleware)
    }
    //创建Promise链条
    composeMiddleware(context){
        let {middlewareArr} = this

        for(let middleware of middlewareArr){
            this.middlewareChain = this.middlewareChain.then(()=>{
                return middleware(context)
            })
        }
        return this.middlewareChain
    }
    initServer(){
        return (req,res)=>{
            let context = {
                req,
                res,
                reqCtx:{
                    body:'', // post 数据
                    query:{} //客户端get请求
                },
                resCtx:{
                    body:'',//返回给前端的内容区
                    headers:{},//请求头
                }
            }
            let {headers} = context.resCtx
            this.composeMiddleware(context).then(()=>{
                let base = {'X-powered-by':'Node.js'}
                let {body} = context.resCtx
                //writeHead 会覆盖 setHeader
                headers = Object.assign(headers,base)
                res.writeHead(200,'ok',headers)
                res.end(body)
            })
            // urlParser(context).then(()=>{
            //     return apiServer(req)
            // }).then(val=>{
            //     if(!val){
            //         return staticServer(context)
            //     }else{
            //         return val
            //     }
            // }).then(val=>{
            //     let base = {'X-powered-by':'Node.js'}
            //     let body = ''
            //     if ( val instanceof Buffer){
            //         body = val
            //     }else{
            //         body = JSON.stringify(val)
            //         let headers = {'Content-Type':'application/json'}
            //         let finalHeader = Object.assign(headers,base)
            //         res.writeHead(200,'ok',finalHeader)
            //     }
            //     res.end(body)
            // })
        }
    }
}

module.exports  = App