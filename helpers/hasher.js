/**
 * @module helpers/hasher
 */

const crypto = require('crypto');

/**
 * Generates random string of characters i.e salt
 * @param {number} length - Length of the random string.
 */
const genRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length);   /** return required number of characters */
}

/**
 * Hash password with sha512 with a given salt.
 * @param {string} password - The password to hash.
 * @param {string} salt - The salt to be used in the hashing.
 * @returns {{hash, salt}}
 */
const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return { salt, hash: value };
}

/**
 * Hash with a random generated salt a password.
 * @param {string} password - The password to hash.
 * @returns {{hash, salt}}
 */
const saltHashPassword = (password) => {
  const salt = genRandomString(16); // Gives us salt of length 16
  return sha512(password, salt);
}

module.exports = { 
    sha512, 
    saltHashPassword 
};