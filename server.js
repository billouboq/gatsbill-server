'use strict';

// modules
const http = require('http');
const express = require('express');
const socketioJwt = require('socketio-jwt');

// server js files
const config = require('./config');
const mongo = require('./database/mongo');
const routeController = require('./route/route');
const socketController = require('./socket/socket');

// init all the things
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// connection to mongodb
mongo.connection(config.mongo.url(), ['users']);

// express route
routeController(app);

// socket io
io.on('connection', socketioJwt.authorize({
	secret: config.jwt.secret,
	timeout: 8000
}));

io.on('authenticated', (socket) => {
	console.log('user is now connected');
   socketController(socket);
});

// launch server
server.listen(config.port, () => {
   console.log(`Server listening on ${config.port} in ${process.env.NODE_ENV} mode`);
});
