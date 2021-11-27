// Require mysql from node modules
var	mysql = require('mysql');

//Set up connection pool limited to 100 connections
var pool      =    mysql.createPool({
    connectionLimit : 100, 
    host     : 'mysql',
    user     : 'admin',
    password : 'admin',
    port     : '3306',
    database : 'docker_demo',
    debug    :  false
});

// Export the pool
module.exports = pool;