'use strict';

const cluster = require('cluster');
const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);
const config = require('./config/config');
const socketController = require('./socket/socket');

// launch server
server.listen(config.port, function () {
   console.log('Express server listening on ' + config.port + ' in ' + process.env.NODE_ENV + ' mode');
});

io.on('connection', function (socket) {
   socketController(socket);
});
