/**
 * @name Logging Setup
 * @file logger.js
 * @description Provides logging solution for server
 * @author Sam Reaves
 * @date November 30th, 2015
 */

// Require winston logger and path node modules
const winston = require('winston'),
    path = require('path');

// Make sure Winston emits errors
winston.emitErrs = true;

// Create logger using Winston
const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: path.join(__dirname, '../logs/logs.log'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});


// Export logger
module.exports = logger;

// Export log stream
module.exports.stream = {
    write: (message, encoding) => {
        logger.info(message);
    }
};
