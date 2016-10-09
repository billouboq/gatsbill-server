'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket) => {

   const query = {
      _id: ObjectID(socket.id)
   }

   const options = {
      fields: {
         friends: 1
      }
   }

   db.users.findOne(query, options, (err, user) => {

      if (err) {
         return socket.emit('getFriends', {status: 500});
      }

      socket.emit('getFriends', {status: 200, body: user.friends});

   });

};
