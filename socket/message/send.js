'use strict';

const db = require('../../database/mongo');
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket, data) => {

   console.log(data);
   const message = {
      to: ObjectID(data._id),
      from: ObjectID(socket.id),
      text: data.message
   }

   db.messages.insertOne(message, (err, result) => {

      if (err) {
         return socket.emit('sendMessage', {status: 500});
      }

      socket.emit('sendMessage', {status: 200});

   });

}
