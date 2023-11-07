const http = require('http')
const express = require('express')
const {Server: SocketIO} = require('socket.io');
const path = require('path')

const app = express();

const server = http.createServer(app)


const io = new SocketIO(server);

io.on('connection', socket => {
    console.log(`user connected: ${socket.id}`);


    socket.on('disconnect', () => {
        console.log(`user disconnected: ${socket.id}`);
    });

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
});

const users = new Map();

app.use(express.static( path.resolve('./public') ));

app.get('/',(req,res)=>{
    // app.use(express.static( path.resolve('./public') ));
    res.sendFile(__dirname + '/index.html')
})

const PORT = process.env.PORT || 8000;


server.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));