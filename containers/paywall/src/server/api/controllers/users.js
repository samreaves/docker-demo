/**
 * @name Users Service
 * @file users.js
 * @description Provides endpoints to user data
 * @author Sam Reaves
 * @date August 14, 2015
 */

/*
	Initialization
 */

// Initialize express, API route and users model
const  express = require('express'),
   usersModel = require('../models/users'),
   usersRoute = express.Router();


/*
	Public Endpoints
 */


// Route that grabs all users
// Verifies that user exists before returing info
usersRoute.get('/', (request, response) => {

  try {
    // Grab users from users model
    usersModel.getAllUsers().then((users) => {

      // Send user data in json format
      response.status(200).send(JSON.stringify(users));
    },
    (getAllUsersError) => {
      console.error(getAllUsersError);
      response.status(500).end('Server error');
    });
  }
  catch (getAllUsersRouteError) {
    console.error(getAllUsersRouteError);
    response.status(500).end('Server error');
  }
});


// Route that grabs username from users
// Verifies that user exists before returing info
usersRoute.get('/:username', (request, response) => {

  try {

    // Cache username from request
    const username = request.params.username;

    // Grab user with request's username
    usersModel.getUserByUsername(username)
      .then((user) => {

        // If user doesn't exist
        if (!user) {
          response.status(404).end('User does not exist');
        }

        // If user exists
        else {

          // Send user data in json format
          response.status(200).send(JSON.stringify({
            username: user.username,
            name: user.name,
            balance: user.balance
          }));
        }
      })
      .catch((error) => {
        console.error(error);
        response.status(404).end('User does not exist');
      });
    }
    catch (getUserByUsernameRouteError) {
      console.error(getUserByUsernameRouteError);
      response.status(500).end('Server error');
    }
});


module.exports = usersRoute;
