'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket) => {

   console.log('get friends');

   const query = {
      _id: ObjectID(socket.id)
   }

   db.users.find(query).toArray((err, users) => {

      console.log(err);
      console.log(users);

      if (err) {
         return socket.emit('removeFriend', {status: 500});
      }

      // socket.emit('removeFriend', {status: 200, body: users});

   });

};
