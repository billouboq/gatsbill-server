'use strict';

const setExpressMiddleware = require('./middlewares');

module.exports = (app) => {

   // express middlewares
   setExpressMiddleware(app);

   app.use('/signin', require('./signin/signin'));
   app.use('/signup', require('./signup/signup'));

};
