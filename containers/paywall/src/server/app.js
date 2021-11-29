/**
 * @name Paywall Server
 * @file app.js
 * @description Initializes server.
 * @author Sam Reaves
 * @date August 13, 2015
 */

// Import Express and initialize server.
const    express = require('express'),
             app = module.exports.app = exports.app = express(),
          logger = require('./utils/logger'),
            path = require('path'),
      bodyParser = require('body-parser'),
            cors = require('cors'),
            auth = require('./auth'),
             api = require('./api'),
     verifyToken = require('./auth/middlewares/verify_token/verify_token'),
           cache = require('./cache'),
              db = require('./db/db'),
 staticDirectory = path.join(__dirname, '../client/');


// Use body parser to parse both application/json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Remove x-powered-by header
app.disable('x-powered-by');

// Remind us that we're using our own Winston logger
logger.debug("Overriding 'Express' logger");

// Set up Morgan to use Winston logger
app.use(require('morgan')('combined', { stream: logger.stream }));

// Set up cross origin resource sharing defaults
app.use(cors());

/* Connect to Redis */
cache.connect().then(() => {
  console.info('Redis connection successful');
}, () => {
  console.error('Redis connection failure');
});

/* Connect to Mongo */
db.connect().then(() => {
  console.info('Mongo connection successful');
}, () => {
  console.error('Mongo connection failure');
});

// Protect API with token
app.use('/api', verifyToken, api);

// Include auth module
app.use('/auth', auth);

// Establish static directory at client/public
app.use(express.static(staticDirectory));

// Route handler for root - sends current static landing page
app.get('/', (request, response) => {
  response.sendFile(path.join(staticDirectory, 'index.html'));
});

// Server starts listening on port 3000.
const server = app.listen(3000, () => {

	const host = server.address().address,
        port = server.address().port;

  // Logs a message to let dev know we're up and running.
  console.info('Example app listening at http://%s:%s', host, port);
});
