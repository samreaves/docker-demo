// Import Express and initialize server.
var express = require('express'),
	routes = express.Router(),
	user_model = require('./model');


// Respond with something simple at root
routes.get('/', function(req, res) {
  console.info("root requested");
  res.status(200).send("Hello, Sam");
});

// On users endpoint
routes.get('/users', function(req, res) {

	console.info("/users requested");

	// Grab all users
	user_model.getAllUsers().then(function(users) {
	
		// If users don't exist
		if (!users) {

			// Send error
			res.status(500).send("Problem grabbing users");
		}

		// If users exist
		else {

			// Send users
			res.status(200).json(users);
		}
	})
	.catch(function(err) {
		console.debug(err);
		// Send error
		res.status(500).send("Problem grabbing users");
	})
});


// Export the server for testing
module.exports = routes;
