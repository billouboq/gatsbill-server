'use strict';

const db = require('../../database/mongo').collections;

module.exports = (socket, data) => {
   console.log(socket.id);
   console.log(data);
};
