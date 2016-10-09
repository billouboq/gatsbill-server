'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket, data) => {

   let query = {
      username: data
   };

   let update = {
      $pull: {
         friends: {
            username: socket.username
         }
      }
   }

   db.users.findOneAndUpdate(query, update, (err, result) => {

      if (err) {
         return socket.emit('removeFriend', {status: 500});
      }

      query = {
         _id: ObjectID(socket.id)
      };

      update = {
         $pull: {
            friends: {
               username: data
            }
         }
      }

      db.users.updateOne(query, update, (err, result) => {

         if (err) {
            return socket.emit('removeFriend', {status: 500});
         }

         socket.emit('removeFriend', {status: 200, body: data});

      });

   });

};
