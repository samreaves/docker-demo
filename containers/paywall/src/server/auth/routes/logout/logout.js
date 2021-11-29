/**
 * @name Logout Controller
 * @file logout.js
 * @description Log Out Endpoint.
 * @author Sam Reaves
 * @date August 17, 2015
 */

'use strict';

const express = require('express'),
	verifyToken = require('../../middlewares/verify_token/verify_token'),
        cache = require('../../../cache'),
  logoutRoute = express.Router();

// Send a POST to root/auth/logout
logoutRoute.post('/', verifyToken, (request, response) => {
  try {
		// check header or url parameters or post parameters for token
		const token = request.headers['x-access-token'];
		const username = request.username;

		// If no username
		if (!username || !token) {

			// Send 422 Must provide username and token
			response.status(422).end('Must provide username and token');
		}

		// Invalidate token here.
		cache.get().del(request.GUID, (err) => {

			// If no error deleting GUID from cache
			if (!err) {

				/* Set header of set-cookie '' httponly secure */

				// Send user success
				response.status(200).send({
					success: true,
					message: 'Log out successful'
				});
			}

			// If error deleting GUID from cache
			else {
				console.error(err);
				response.status(500).end('Server error');
			}
		});
	}
	catch (logoutRouteError) {
		console.error('Error on logout route: ', logoutRouteError);
		response.status(500).end('Server error');
	}
});

module.exports = logoutRoute;
