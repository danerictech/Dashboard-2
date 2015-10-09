var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    path = require("path");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
    res.redirect(path.join(__dirname, '../', 'index.html'));
    next();
});

server.listen(app.get('port'), function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
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
