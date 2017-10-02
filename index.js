const http = require('http')
const PORT = 7000
const App = require('./app')
const server = new App()
const apiServer = require('./app/api-server')
const urlParser = require('./app/url-parser')
const staticServer = require('./app/static-server')
const viewServer = require('./app/view-server')
const cookieParser = require('./app/cookie-parser')

server.use(cookieParser)
server.use(urlParser)
server.use(apiServer)
server.use(staticServer)
server.use(viewServer)

http.createServer(server.initServer()).listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})