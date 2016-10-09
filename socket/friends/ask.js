'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket, data) => {

   const myId = ObjectID(socket.id);
   const date = new Date();

   let query = {
      $and: [
         {username: data},
         {_id: {$ne: myId}},
         {'friends.username': {$ne: socket.username}}
      ]
   }

   let update = {
      $push: {
         friends: {
            username: socket.username,
            date: date,
            status: 'pending'
         }
      }
   }

   db.users.findOneAndUpdate(query, update, (err, result) => {

      if (err) {
         return socket.emit('askFriend', {status: 500});
      }

      if (!result.value) {
         return socket.emit('askFriend', {status: 400});
      }

      query = {
         _id: myId
      }

      update = {
         $push: {
            friends: {
               username: result.value.username,
               date: date,
               status: 'ask'
            }
         }
      }

      db.users.updateOne(query, update, (err, result) => {

         if (err) {
            return socket.emit('askFriend', {status: 500});
         }

         socket.emit('askFriend', {status: 200, body: data});

      });

   });

};
