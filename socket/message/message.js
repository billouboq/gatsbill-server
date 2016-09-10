'use strict';

module.exports = (socket, data) => {
   socket.broadcast.emit('message', data);
};
