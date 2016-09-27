'use strict';

module.exports = {keysIn};

/**
 * Check if all keys (provided in an array) are in an object
 * @param  {Object} object The object you want to verify
 * @param  {Keys} keys     An array of key
 * @return {Boolean}       Return true if ALL keys are in the object
 */
function keysIn(object, keys) {

   if (!object || !keys) {
      throw new Error('Missing parameters');
   }

   if (Array.isArray(keys) && keys.length) {
      return keys.filter(key => object.hasOwnProperty(key)).length === keys.length;
   }

}
