/**
 * @name verifyToken
 * @description Verifies user and token match those stored in user db
 *
 * @param {object} [request] [Request Object]
 * @param {object} [response] [Response Object]
 * @param {object} [next] [Next middleware method to run]
 *
 * @author Sam Reaves
 * @date August 20th, 2015
 */

const    jwt = require('jsonwebtoken'),
       cache = require('../../../cache'),
       crypt = require('../../encryption');


// Authentication middleware for verifying user's username and hashword
module.exports = function verifyToken(request, response, next) {

  try {

    // check header or url parameters or post parameters for token
    /* TODO JWT authentication cookie and token
     * Set Authorization: Bearer ${token} Header
     * Set Set-Cookie: session=${token}; Domain=${process.env.DOMAIN}; Secure; HttpOnly
     */
    const requestToken = request.headers['x-access-token'];

    // decode token
    if (requestToken) {

      // verifies secret and checks exp
      jwt.verify(requestToken, process.env.TOKEN_SECRET, { algorithms: ['HS256'], issuer: 'urn:Paywall', maxAge: '2m' }, (verificationError, verifiedToken) => {

        // If error
        if (!verificationError) {

          // Cache GUID and token expiration
          const GUID = verifiedToken.GUID;

          console.info('Attempting to grab token from cache with GUID: ', GUID);

          /* Check one more time here for the token to be in the cache */
          cache.get().get(GUID, (tokenNotFoundError, tokenFromRedis) => {

            // If GUID was found inside cache
            if (!tokenNotFoundError) {

              console.info(tokenFromRedis);

              jwt.verify(tokenFromRedis, process.env.TOKEN_SECRET, { algorithms: ['HS256'], issuer: 'urn:Paywall', maxAge: '2m' }, (tokenFromRedisVerificationError, decodedRedisToken) => {

                if (!tokenFromRedisVerificationError) {

                  // if everything is good, save to request for use in other routes
                  request.username = crypt.decrypt(decodedRedisToken.GUID);
                  request.GUID = decodedRedisToken.GUID;

                  // Proceed.
                  next();
                }
                else {
                  console.info('token from within redis invalid: ', tokenFromRedisVerificationError);

                  // You are the droid I'm looking for.
                  return response.status(401).end('Failed to authenticate token.');
                }

              });
            }

            // If GUID was not found inside cache
            else {

              console.info('token not found in redis: ', tokenNotFoundError);

              // You are the droid I'm looking for.
              return response.status(401).end('Failed to authenticate token.');
            }
          });
        }

        // Token invalid
        else {

          console.info('token used for request invalid: ', verificationError);

          // You are the droid I'm looking for.
          return response.status(401).end('Failed to authenticate token.');
        }
      });
    }
    // If no token attached to request
    else {

      // if no token attached to request, fuck off
      return response.status(403).send('No token provided.');
    }
  }
  catch (verifyTokenMiddlewareError) {
    console.error('token verification middleware error: ', verifyTokenMiddlewareError);
  }
};
