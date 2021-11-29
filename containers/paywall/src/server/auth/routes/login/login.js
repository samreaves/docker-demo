/**
 * @name Login Controller
 * @file login.js
 * @description Log In Endpoint.
 * @author Sam Reaves
 * @date August 16, 2015
 */

'use strict';

const express  = require('express'),
           jwt = require('jsonwebtoken'),
	authenticate = require('../../middlewares/authenticate/authenticate'),
         cache = require('../../../cache'),
         crypt = require('../../encryption'),
    loginRoute = express.Router();


// POST on root/auth/login
loginRoute.post('/', authenticate, (request, response) => {

  try {

    // Cache username
    const username = request.body.username;

    // Create GUID
    const GUID = crypt.encrypt(username);

    console.info('GUID created: ', GUID);

    // Create token with payload of GUID, issuedAt, expiry, issuer, and with algorithm header
    jwt.sign({ GUID }, process.env.TOKEN_SECRET, { algorithm: 'HS256', issuer: 'urn:Paywall', expiresIn: '2m' }, (tokenCreationError, token) => {

      if (!tokenCreationError) {

        console.info('token created: ', token);

        // Add token to cache here
        cache.get().set(GUID, token, 'EX', 120, (redisAddError) => {

          // If no error
          if (!redisAddError) {

            /* TODO: Set header of set-cookie '' httponly */

            // Send user token and its username
            response.status(200).send({
              success: true,
              token
            });
          }

          // If error putserting token into cache
          else {
            console.error(redisAddError);
            response.status(500).end('Server error');
          }
        });
      }
      else {
        console.error(tokenCreationError);
        response.status(500).end('Server error');
      }
    });
  }
  catch (loginRouteError) {
    console.error('Error on login route: ', loginRouteError);
    response.status(500).end('Server error');
  }
});

module.exports = loginRoute;
