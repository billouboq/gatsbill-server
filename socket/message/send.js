'use strict';

const db = require('../../database/mongo');

module.exports = (socket, data) => {

   const message = {
      text:
      users: []
      sender:
   }

   db.messages.insertOne(message, (err, result) => {

      if (err) {
         return socket.emit('sendMessage', {status: 500});
      }



   });

}
