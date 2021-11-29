/**
 * @name Sign Up Controller
 * @file signup.js
 * @description Sign Up Endpoint.
 * @author Sam Reaves
 * @date May 14th, 2017
 */

'use strict';

const express  = require('express'),
 doesUserExist = require('../../middlewares/does_user_exist/doesUserExist'),
    usersModel = require('../../../api/models/users'),
   signUpRoute = express.Router();


// POST on root/auth/signup
signUpRoute.post('/', doesUserExist, (request, response) => {

  try {

    // Cache username and password
    const username = request.body.username,
          password = request.body.password,
          name = request.body.name,
          balance = request.body.balance;

    /* Attempt to create user */
    usersModel.createUser(username, password, name, balance).then(() => {
      response.status(200).send({
        success: true,
        username
      });
    })
    .catch((createUserError) => {
      console.error('Error on signup route: ', createUserError);
      response.status(500).end('Server error');
    });

  }
  catch (signUpRouteError) {
    console.error('Error on signup route: ', signUpRouteError);
    response.status(500).end('Server error');
  }
});

module.exports = signUpRoute;
