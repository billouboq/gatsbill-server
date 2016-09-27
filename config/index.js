'use strict';

const prodConfig = require('./config.prod');
const devConfig = require('./config.dev');

module.exports = (process.env.NODE_ENV === 'production') ? prodConfig : devConfig;
