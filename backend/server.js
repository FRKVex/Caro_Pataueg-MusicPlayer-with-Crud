const http = require('http')
const app = require('./app')
const db = require('./api/model/dbConn')

const server = http.createServer(app);
const port = 8000;

server.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})