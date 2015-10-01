var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response) {
        var path = url.parse(request.url).pathname;

        switch (path) {
            case '/':
                fs.readFile(__dirname + path, function(err, data) {
                    if (err) {
                        return send404(response);
                    }
                    response.writeHead(200, {
                        'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'
                    });
                    response.write(data, 'utf8');
                    response.end();
                });

            default:
                send404(response);
        }
    }),

    send404 = function(response) {
        response.writeHead(404);
        response.write('404');
        response.end();
    }

server.listen(8081);

var io = require('socket.io').listen(server);

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
        // socket.emit('msgWrite', msgWrite);
    }, 1000);
});
