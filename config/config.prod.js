'use strict';

const config = {

   // port of node.js app
   port: 9876,

   jwt: {
      secret: 'zh7dn3erDCek9aD587àHdn2H'
   },

   crypto: {
      password: {
         saltLength: 32,
         iterations: 50000,
         keyLength: 128,
         digest: 'sha512'
      }
   },

   // mongo database
   mongo: {
      user: null,
      password: null,
      host: '127.0.0.1',
      port: '27017',
      database: 'gatsbill',
      url: getMongoUrl
   },

};

function getMongoUrl() {

   const startUrl = (config.mongo.user && config.mongo.password)
      ? '[' + config.mongo.user + ':' + config.mongo.password + '@]'
      : '';

   const endUrl = config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;

   return 'mongodb://' + startUrl + endUrl;

}

module.exports = config;
