/**
 * @name doesUserExist
 * @description Verifies user exists in db
 *
 * @param {object} [request] [Request Object]
 * @param {object} [response] [Response Object]
 * @param {object} [next] [Next middleware method to run]
 *
 * @author Sam Reaves
 * @date May 14th, 2017
 */

// Import users model
const usersModel = require('../../../api/models/users');


// Authentication middleware for verifying if user exists
module.exports = function doesUserExist(request, response, next) {

  try {

    // Cache body as we'll be using it a lot.
    const body = request.body;

    // If username or password not passed from body
    if (!body.username || !body.password) {

      // Not allowed in. Send a username or password.
      response.status(400).end('Must provide username or password');
    }
    else {

      console.info(`sign up event with username: ${body.username} and password: ${body.password}`);

      // Cache current user's username
      usersModel.getUserByUsername(body.username)
        .then((user) => {

          /* If user returns */
          if (user) {
            console.info('signup event fired with existing username');

            return response.status(200).send({
              success: false,
              error: 'Account with that username already exists'
            });
          }
          /* If no user returned from get user by username, send to next middleware */
          else {
            next();
          }
        })
        .catch((getUserByUsernameError) => {
          console.error('get user by username error: ', getUserByUsernameError);
          response.status(500).end('Server error');
        });
    }
  }
  catch (doesUserExistMiddlewareError) {
    console.error('authentication middleware error: ', doesUserExistMiddlewareError);
    response.status(500).end('Server error');
  }
};
