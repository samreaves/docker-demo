/*
	Initialization of private cached data
 */

// Initialize express, file system, lodash
var db = require('./db'),
	Q = require('q');
    
/*
	Methods
*/

/**
 * @name getAllUsers
 * @description Provides endpoint to all product data 
 *
 * @returns {array} users
*/
module.exports.getAllUsers = function() {

	// Create promise
	var deferred = Q.defer();
	
	// Grab connection from database pool
	db.getConnection(function(err, connection) {

		// If error
		if (err) {

			// Release the connection. Reject the promise
			connection !== undefined ? connection.release() : console.log(err);


			console.log(err);
			deferred.reject(err);
		} 

		// If we're in the clear
		else {

			// Log to server console the connection's thread id
			console.log('connected as id: ', connection.threadId);

			// Grab only username and email from all users in user table
			connection.query('SELECT * FROM users', function(err, users) {
				
				// Release the connection
				connection.release();
				
				// If no error, resolve the users
				if (!err) {
					deferred.resolve(users);
				}
			});

			// On error, reject promise with error
			connection.on('error', function(err) {
				deferred.reject(err);
				console.log(err);
			})
		}
	})

	// Return promise
	return deferred.promise;
}
