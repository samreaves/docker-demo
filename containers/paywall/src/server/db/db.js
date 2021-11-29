/**
 * @name Database Setup
 * @file db.js
 * @description Provides Mongo connection for app
 * @author Sam Reaves
 * @date May 7th, 2017
 */

 /* Import MongoDB package */
 const MongoClient = require('mongodb');

 const state = {
   db: null
 };

 exports.connect = () => new Promise((resolve, reject) => {
   // Attach to database
   MongoClient.connect(process.env.MONGO_URI, (mongoClientConnectionError, database) => {
     if (mongoClientConnectionError || !database)  {
       console.error('mongo client connection error: ', mongoClientConnectionError);
       reject(mongoClientConnectionError);
     }
     else {
       state.db = database;
       console.info('db connected');
       resolve(true);
     }
   });
 });

 exports.get = () => state.db;

 exports.close = () => new Promise((resolve, reject) => {
   if (state.db) {
     state.db.close((err, result) => {
       state.db = null;
       state.mode = null;
     });
     console.info('db closed');
     resolve();
   }
 });
