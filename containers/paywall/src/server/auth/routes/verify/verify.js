/**
 * @name Verify Controller
 * @file verify.js
 * @description Verify Endpoint.
 * @author Sam Reaves
 * @date November 29th, 2021
 */

 'use strict';

 const express  = require('express'),
       verifyRoute = express.Router();
 
 
 // POST on root/auth/verify
 verifyRoute.get('/', (request, response) => {
 
   try {
    /* If verified, send 200 */
    response.status(200).send();
   }
   catch (verifyRouteError) {
     console.error('Error on login route: ', verifyRouteError);
     response.status(500).end('Server error');
   }
 });
 
 module.exports = verifyRoute;
 