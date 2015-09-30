var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

//Setting the port
var port = process.env.PORT || 8081;

//Setting the routes.

var router = express.Router();

router.get('/', function(request, response) {
    response.end({ message : "You have reached the home page."})
});

app.use('/api', router);

var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})
