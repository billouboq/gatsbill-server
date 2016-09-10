'use strict';

module.exports = (socket) => {
   listenTo(socket, 'message', require('./message/message'));
};

function listenTo(socket, name, callback) {
   socket.on(name, data => callback(socket, data));
}
