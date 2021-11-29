/**
 * @name authenticate
 * @description Verifies user and password match those stored in user db
 *
 * @param {object} [request] [Request Object]
 * @param {object} [response] [Response Object]
 * @param {object} [next] [Next middleware method to run]
 *
 * @author Sam Reaves
 * @date August 16th, 2015
 */

// Import users model
const usersModel = require('../../../api/models/users'),
      encryption = require('../../encryption');


// Authentication middleware for verifying user's username and password
module.exports = function authenticate(request, response, next) {

  try {

    // Cache body as we'll be using it a lot.
    const body = request.body;

    // If username or password not passed from body
    if (!body.username || !body.password) {

      // Not allowed in. Send a username or password to be authenticated.
      response.status(400).end('Must provide username or password');
    }
    else {

      console.info(`authentication event with username: ${body.username}`);

      // Cache current user's username
      usersModel.getUserByUsername(body.username)
        .then((currentUser) => {

          console.info('user found: ', currentUser);

          /* Hash password before passing conditional */
          const hashword = encryption.hash(body.password);

          /* If encryption successful */
          if (hashword) {
            if (body.username !== currentUser.username || hashword !== currentUser.password) {

              // Send them an incorrect error
              response.status(401).end('Username or password incorrect');
            }
            // User passes all checks.
            else {

              // Proceed to next middleware
              next();
            }
          }
          /* If hashword encryption was unsuccessful */
          else {
            console.error('password encryption failed');
            response.status(500).end('Server error');
          }
        })
        .catch((error) => {
          console.error(error);
          response.status(404).end('User does not exist');
        });
    }
  }
  catch (authenticateMiddlewareError) {
    console.error('authentication middleware error: ', authenticateMiddlewareError);
  }
};
