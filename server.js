'use strict';

// modules
const http = require('http');
const express = require('express');
const socketioJwt = require('socketio-jwt');

// server js files
const config = require('./config');
const mongo = require('./database/mongo');
const expressMiddlewares = require('./middlewares');
const routeController = require('./route/route');
const socketController = require('./socket/socket');

// init all the things
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// connection to mongodb
mongo.connection(config.mongo.getUrl(), ['users']);

// express middleware
expressMiddlewares(app);

// express route
routeController(app);

// socket io jwt middleware
io.on('connection', socketioJwt.authorize({
	secret: config.jwt.secret,
	timeout: 15000,
}));

// when user is authenticated
io.on('authenticated', (socket) => {

	console.log('authenticated')

	// now socket id is the user _id
	socket.id = socket.decoded_token._id;
	socket.username = socket.decoded_token.username;

	// start socket route listeners
	socketController(socket);

});

// launch server
server.listen(config.port, () => {
   console.log(`Server listening on ${config.port} in ${process.env.NODE_ENV} mode`);
});
