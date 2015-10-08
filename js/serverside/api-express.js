var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    path = require("path");

app.use(express.static(path.join(__dirname, '../', 'bower_components')));

app.get('/', function(req, res, next) {
	console.log(path.join(__dirname, '../../', 'index.html'))
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

var serverjson = [{
    "Product": "REL",
    "BBP": "10",
    "BSP": "10.2",
    "LTP": "10.1"
}, {
    "Product": "BEL",
    "BBP": "20",
    "BSP": "20.4",
    "LTP": "20"
}, {
    "Product": "MTL",
    "BBP": "50",
    "BSP": "50.5",
    "LTP": "50.1"
}, {
    "Product": "BSL",
    "BBP": "100",
    "BSP": "101",
    "LTP": "100.2"
}];

io.sockets.on('connection', function(socket) {
    setInterval(function() {
        for (i = 0; i < serverjson.length; i++) {
            serverjson[i].BBP = Math.round((parseInt(serverjson[i].BBP) + Math.random()) * 100) / 100;
            serverjson[i].BSP = Math.round((parseInt(serverjson[i].BSP) + Math.random()) * 100) / 100;
            serverjson[i].LTP = Math.round((parseInt(serverjson[i].LTP) + Math.random()) * 100) / 100;
        }

        var serverjsonstr = JSON.stringify(serverjson);

        socket.emit("msg", {
            'msg': serverjsonstr
        });
    }, 1000);
});

server.listen(4200);
