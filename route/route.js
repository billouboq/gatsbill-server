'use strict';

function expressRoutes(app) {
   app.use('/signin', require('./signin/signin'));
   app.use('/signup', require('./signup/signup'));
}

module.exports = expressRoutes;
