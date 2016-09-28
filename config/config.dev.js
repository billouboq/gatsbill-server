'use strict';

const config = {

   // port of node.js app
   port: 1234,

   jwt: {
      secret: 'zh7djHdbd7àHdn2HAmspci41'
   },

   // mongo database
   mongo: {
      user: null,
      password: null,
      host: '127.0.0.1',
      port: '27017',
      database: 'gatsbillDev',
      getUrl: getMongoUrl
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
