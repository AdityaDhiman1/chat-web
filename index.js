const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const path = require('path')
const io = new Server(server)

app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.render('index')
})

io.emit('some event',{someProperty:'some value',otherProperty:'other value'})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message :'  ,msg)
    })
})

server.listen(4999, () => {
    console.log("Server start" ,4999)
})