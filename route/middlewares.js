'use strict';

const compression = require('compression')
const bodyParser = require('body-parser');
const morgan = require('morgan')

module.exports = (app) => {

   // compress all the things
   app.use(compression());

   // show all request with useful informations
   app.use(morgan('dev'));

   // parser
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({
     extended: true
   }));

}
