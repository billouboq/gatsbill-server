'use strict';

const MongoClient = require('mongodb').MongoClient;
const collections = {}

module.exports = {
   connection,
   collections
};

/**
 * Connect to mongodb and set all collection
 * @param  {String} url             mongo url to connect to the database
 * @param  {Array} collectionNames  Array of collection you want to use
 */
function connection(url, collectionNames) {

   if (!url || !collectionNames) {
      throw new Error('One parameter is missing');
   }

   MongoClient.connect(url, (err, database) => {

      if (err) {
         throw err;
      }

      collectionNames.forEach(name => {
         collections[name] = database.collection(name);
      });

   });

}
