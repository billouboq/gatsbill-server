'use strict';

module.exports = (app) => {
   app.use('/signin', require('./signin/signin'));
   app.use('/signup', require('./signup/signup'));
};
