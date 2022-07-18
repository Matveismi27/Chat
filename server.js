express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (request, respons) {
    respons.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', function(socket){
    console.log(`пользователь ${socket} теперь с нами!`)
    connections.push(socket);

    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log(`пользователь ${socket} отсоеденился`)
    });
    socket.on('send mess',function(data){
        io.sockets.emit('add mess',{msg:data});
    });
});