'use strict';

const MongoClient = require('mongodb').MongoClient;
const Collection = require('./collections');

const config = {
   db: null,
   collections: []
}

module.exports = {
   connection,
   collections: config.collections
};

function connection(url, collectionNames) {

   if (!url) {
      throw new Error('Mongo url is missing');
   }

   if (!collectionNames) {
      throw new Error('Mongo collection names is missing');
   }

   MongoClient.connect(url, (err, database) => {

      if (err) {
         throw err;
      }

      config.db = database;

      collectionNames.forEach(name => {
         config.collections.push(new Collection(
            database.collection(name)
         ));
      });

   });

}
