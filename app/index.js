const fs = require('fs')
const path = require('path')

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
                    query:{}, //客户端get请求

                },
                resCtx:{
                    body:'',//返回给前端的内容区
                    headers:{},//请求头
                    statusCode:200, // 状态吗
                    statusMessage:'ok',
                    hasUser:false, //权限
                    active:''//颜色
                }
            }

            this.composeMiddleware(context).then(()=>{
                let base = {'X-powered-by':'Node.js'}
                let {body,statusCode,headers,statusMessage} = context.resCtx
                //writeHead 会覆盖 setHeader
                headers = Object.assign(headers,base)
                res.writeHead(statusCode,statusMessage,headers)
                res.end(body)
            })

        }
    }
}

module.exports  = App