/**
 * @name Users Model
 * @file users.js
 * @description Provides user model
 * @author Sam Reaves
 * @date August 17, 2015
 */


/*
	Initialization of private cached data
 */

// Import Mongo Client
const encryption = require('../../auth/encryption'),
              db = require('../../db/db.js');

/*
	Public methods
*/

/**
 * @name getAllUsers
 * @description Provides endpoints to user data
 *
 * @returns {array} list_of_users List of user objects
 *
 * @author Sam Reaves
 * @date August 20, 2015
 */
module.exports.getAllUsers = () => new Promise((resolve, reject) => {

	try {
		// Grab all users from user table
		db.get().collection('users').find().toArray((err, results) => {
      if (err) {
				console.error(err);
				reject(err);
			}
      else {
				resolve(results);
			}
		});
	}
	catch (getAllUsersError) {
    console.error('Error grabbing all users: ', getAllUsersError);
		reject('Error grabbing all users: ', getAllUsersError);
	}
});


/**
 * @name getUserByUsername
 * @description Provides endpoints to user data
 *
 * @param {string} username User's username
 * @returns {object} user User object
 *
 * @author Sam Reaves
 * @date August 14, 2015
 */
module.exports.getUserByUsername = (username) => new Promise((resolve, reject) => {

	console.info('searching for username: ', username);

	try {
		// Grab only username and email from all users in user table
		db.get().collection('users').findOne({ username }, (err, results) => {

			// If no error, resolve the rows
			if (!err) {
				console.info('results: ', results);

				resolve(results);
			}
			else {
				console.error(err);
				reject(err);
			}
		});
	}
	catch (getUserByUsernameError) {
		console.error('Error grabbing user by username: ', getUserByUsernameError);
		reject('Error grabbing user by username: ', getUserByUsernameError);
	}
});

/**
 * @name createUser
 * @description Provides model method to create user
 *
 * @param {string} username User's username
 * @param {string} password User's password
 * @returns {string} success Success or failure
 *
 * @author Sam Reaves
 * @date May 14, 2017
 */
module.exports.createUser = (username, password, name, balance) => new Promise((resolve, reject) => {

	console.info('creating user... ');

	try {

		/* Hash password */
		const hashword = encryption.hash(password);

		if (hashword) {
			// Grab only username and email from all users in user table
			db.get().collection('users').insert({ username, password: hashword, name, balance }, (err, results) => {

				// If no error, resolve the rows
				if (!err) {
					console.info('results: ', results);

					resolve(results);
				}
				else {
					console.error(err);
					reject(err);
				}
			});
		}
		else {
			console.error('error hashing password');
			reject('Error hashing password');
		}
	}
	catch (createUserError) {
		console.error('Error creating user: ', createUserError);
		reject('Error creating user: ', createUserError);
	}
});
