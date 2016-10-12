'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket) => {

   const query = {
      ownerid: ObjectID(socket.id)
   }

   db.friends.find(query).toArray((err, friends) => {

      if (err) {
         return socket.emit('getFriends', {status: 500});
      }

      socket.emit('getFriends', {status: 200, body: friends});

   });

};
