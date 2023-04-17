var express = require('express')
var app = express()
let server = app.listen(3240)
let allPos = []

let lobbies = []

app.use(express.static('public'))
console.log('My socket server is running');

let socket = require('socket.io')
let io = socket(server)
io.sockets.on('connection', newConnection)

function newConnection(socket) {
    console.log('new connection: ' + socket.id)

    for (let i = 0; i < allPos.length; i++) {
        io.sockets.emit('mouse', allPos[i])
    }
    
    socket.on('mouse', mouseMsg)

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data)
        console.log(data + " from: " + socket.id)
        allPos.push(data)
    }

    socket.on("request", answer)

    function answer(s) {
        let data = {
            rooms:lobbies
        }
        io.sockets.emit("answer", data)
    }

    
}