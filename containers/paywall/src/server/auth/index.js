/**
 * @name Auth Index File
 * @file index.js
 * @description Provides interface to Auth
 * @author Sam Reaves
 * @date August 17, 2015
 */

/*
	Initialization
 */

// Initialize express, API route and users model
const login = require('./routes/login/login'),
     logout = require('./routes/logout/logout'),
     signup = require('./routes/signup/signup'),
    express = require('express'),
  authRoute = express.Router();

// Send 404 when any request sent to root/auth
authRoute.all('/', (request, response) => {
	response.send(404);
});

// Use login controller for login route
authRoute.use('/login', login);

// Use logout controller for logout route
authRoute.use('/logout', logout);

// Use sign up controller for sign up route
authRoute.use('/signup', signup);

// Export auth route
module.exports = authRoute;
