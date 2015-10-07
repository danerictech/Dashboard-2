// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var server = http.createServer();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8082;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8082/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);

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


console.log('Magic happens on port ' + port);