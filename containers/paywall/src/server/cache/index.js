/**
 * @name Cache Singleton
 * @file index.js
 * @description Exports connection to redis cache.
 * @author Sam Reaves
 * @date May 7, 2017
 */

/* Import Redis package */
const redis = require('redis');

const state = {
  cache: null
};

/* Export singleton to get cache */
exports.get = () => state.cache;

/* Export cache connection function */
exports.connect = () => new Promise((resolve, reject) => {
  const redisClient = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, password: process.env.REDIS_PASSWORD });

  redisClient.on('ready', () => {
    console.info('Redis is ready');
    state.cache = redisClient;
    resolve(true);
  });

  redisClient.on('error', (redisError) => {
    console.log('Redis error: ', redisError);
    reject(false);
  });
});

exports.close = () => {
  if (state.cache.hasOwnProperty('quit')) {
    state.cache.quit();
    state.cache = null;
  }
};
