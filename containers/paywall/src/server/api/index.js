/**
 * @name API Index File
 * @file index.js
 * @description Provides interface to API
 * @author Sam Reaves
 * @date August 16, 2015
 */

/*
	Initialization
 */

const users = require('./controllers/users.js');

// Initialize express and API route
const express = require('express'),
     apiRoute = express.Router();

/* This route does not exist */
apiRoute.all('/', (request, response) => {
	response.send(404);
});

/* /users route leads to imported users controller */
apiRoute.use('/users', users);

module.exports = apiRoute;
