'use strict';

const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

module.exports = (app) => {

   // compress all the things
   app.use(compression());

   // security
   app.use(helmet());

   // parser
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({
      extended: true
   }));

   // show all request with useful informations
   if (process.env.NODE_ENV !== 'production') {
      app.use(morgan('dev'));
   }

};
