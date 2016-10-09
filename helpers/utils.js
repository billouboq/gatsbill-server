'use strict';

const crypto = require('crypto');
const passConfig = require('../config').crypto.password;

module.exports = {keysIn, signPassword, verifyPassword};

/**
 * Check if all keys (provided in an array) are in an object
 * @param  {Object} object    The object you want to verify
 * @param  {Keys} keys        An array of key
 * @return {Boolean}          Return true if ALL keys are in the object
 */
function keysIn(object, keys) {

   if (Array.isArray(keys) && keys.length) {
      return keys.filter(key => object.hasOwnProperty(key)).length === keys.length;
   }
   
}

/**
 * signPassword and return a buffer containing the hash and the salt
 * @param  {String} password    The password you want to sign
 * @return {Buffer}             The buffer containing the salt and the hash
 */
function signPassword(password) {

   // create salt
   const salt = crypto.randomBytes(passConfig.saltLength);

   // create a buffer with the hash of the password
   const hash = crypto.pbkdf2Sync(password, salt, passConfig.iterations, passConfig.keyLength, passConfig.digest);

   // add salt at the beginning of the buffer
   salt.copy(hash, 0);

   // return the buffer
   return hash;

}

/**
 * verify that password is the same as the one hashed in the buffer
 * @param  {String} password   The password you want to verify
 * @param  {Buffer} hash       The buffer containing a signed password
 * @return {Boolean}           True of password are the same otherwise False
 */
function verifyPassword(password, hash) {

   if (Buffer.isBuffer(hash)) {

         // get salt used to create password
         const salt = hash.slice(0, passConfig.saltLength);

         // get old hash
         const oldHash = hash.toString('binary', passConfig.saltLength);

         // get new hash
         const newHash = crypto.pbkdf2Sync(password, salt, passConfig.iterations, passConfig.keyLength, passConfig.digest);

         // compare the two hashes and return the result
         return newHash.toString('binary', passConfig.saltLength) === oldHash;

   }

}
