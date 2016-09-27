'use strict';

const MongoClient = require('mongodb').MongoClient;
const collections = {}

module.exports = {
   connection,
   collections
};

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
