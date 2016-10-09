'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket, data) => {

   let query = {
      $and: [
         {username: data},
         {'friends.username': socket.username}
      ]
   }

   let update = {
      $set: {
         'friends.$.status': 'accepted'
      }
   }

   db.users.findOneAndUpdate(query, update, (err, result) => {

      if (err) {
         return socket.emit('acceptFriend', {status: 500});
      }

      query = {
         $and: [
            {_id: ObjectID(socket.id)},
            {'friends.username': data}
         ]

      }

      update = {
         $set: {
            'friends.$.status': 'accepted'
         }
      }

      db.users.updateOne(query, update, (err, result) => {

         if (err) {
            return socket.emit('acceptFriend', {status: 500});
         }

         socket.emit('acceptFriend', {status: 200, body: data});

      });

   });

};
