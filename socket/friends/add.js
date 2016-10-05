'use strict';

const db = require('../../database/mongo').collections;

module.exports = (socket, data) => {

   db.users.findOneAnd
   console.log(socket.id);
   console.log(data);
};
