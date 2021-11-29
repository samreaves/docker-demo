/**
 * @name Encryption module
 * @file index.js
 * @description Encryption module for encryption and decryption
 * @author Sam Reaves
 * @date September 8th, 2015
 */

// Import crypto module and specify algorithm
const crypto = require('crypto'),
   algorithm = 'aes-256-ctr'; // or any other algorithm supported by OpenSSL

// Import secret. Create cypher and decyper
const key = process.env.TOKEN_SECRET;


/**
 * @name Encrypt
 * @description Encrypts passed data
 *
 * @param {object} privateString String to be encrypted
 *
 * @returns {string} [Encrypted string]
 *
 * @author Sam Reaves
 * @date September 8th, 2015
 */
module.exports.encrypt = (privateString) => {
  try {
    // Create cipher for just this encryption process
    const cipher = crypto.createCipher(algorithm, key);

    // Encrypt
    let encrypted = cipher.update(privateString, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // return encrypted utf8 hex string
    return encrypted;
  }
  catch (encryptionError) {
    console.error('Encryption error: ', encryptionError);
  }
};


/**
 * @name Decrypt
 * @description Decrypts passed encrypted string
 *
 * @param {object} encryptedString Encrypted tring to be decrypted
 *
 * @returns {string} [data]
 *
 * @author Sam Reaves
 * @date September 8th, 2015
 */
module.exports.decrypt = (encryptedString) => {
  try {
    // Create decipher for this decryption instance
    const decipher = crypto.createDecipher(algorithm, key);

    // Decrypt
    let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Return decrypted string
    return decrypted;
  }
  catch (decryptionError) {
    console.error('decryption error: ', decryptionError);
  }
};

/**
 * @name Hash
 * @description One way encrypts passed string
 *
 * @param {object} privateString private string to be encrypted
 *
 * @returns {string} hash Hashed forever encrypted string
 *
 * @author Sam Reaves
 * @date May 14th, 2017
 */
module.exports.hash = (privateString) => {
  try {

    // Return encrypted string
    return crypto.createHmac('sha256', process.env.TOKEN_SECRET).update(privateString).digest('hex');
  }
  catch (encryptionError) {
    console.error('encryption error: ', encryptionError);
  }
};
