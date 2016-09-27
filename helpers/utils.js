'use strict';

module.exports = {keysIn};

function keysIn(object, keys) {

   if (!object || !keys) {
      throw new Error('Missing parameters');
   }

   if (Array.isArray(keys) && keys.length) {
      return keys.filter(key => object.hasOwnProperty(key)).length === keys.length;
   }

}
