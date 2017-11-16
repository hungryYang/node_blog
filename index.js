const http = require('http')
const PORT = 8001
const App = require('./app')
const server = new App()
const apiServer = require('./app/api-server')
const urlParser = require('./app/url-parser')
const staticServer = require('./app/static-server')
const viewServer = require('./app/view-server')
const cookieParser = require('./app/cookie-parser')

server.use(urlParser)
server.use(cookieParser)
server.use(apiServer)
server.use(staticServer)
server.use(viewServer)

//引入mongoose
const mongoose = require('mongoose')
// Use native promises
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/blogDB')
mongoose.connection.on('error', ()=>{console.log(`error happend for db`)})
		.once('open', ()=>{console.log(`we're connected!`)})

http.createServer(server.initServer()).listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})