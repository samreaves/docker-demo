// Import Express and initialize server.
var express = require('express'),
	app = module.exports.app = exports.app = express(),
	body_parser = require('body-parser'),
	db = require("./db"),
	routes = require("./routes"),
	server,
	host,
	port;

// We don't tell them what we're running on
app.disable('x-powered-by');

// Use body parser to parse both application/json and application/x-www-form-urlencoded
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

// Include routes
app.use(routes);

// Server starts listening on port 3000.
server = app.listen(3000, function() {

	host = server.address().address,
  	port = server.address().port;

  	// Logs a message to let dev know we're up and running.
  	console.info('Example app listening at http://%s:%s', host, port);
});

// Export the server for testing
module.exports = server;



/*

    "body-parser": "^1.13.3",
    "cors": "2.7.1",
    "crypto": "0.0.3",
    "jsonwebtoken": "^7.4.0",
    "lodash": "3.10.1",
    "q": "^1.4.1",

*/