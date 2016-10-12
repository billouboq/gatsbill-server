'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket, data) => {

   const myId = ObjectID(socket.id);
   const userId = ObjectID(data);

   const query = {
      $and: [
         {ownerid: myId},
         {userid: userId}
      ]
   }

   db.friends.findOne(query, (err, friend) => {

      if (err) {
         return socket.emit('acceptFriend', {status: 500});
      }

      if (!friend) {
         return socket.emit('acceptFriend', {status: 400});
      }

      const updateQueryUser = {
         $and: [
            {ownerid: userId},
            {userid: myId}
         ]
      }

      const updateQueryOwn = {
         $and: [
            {ownerid: myId},
            {userid: userId}
         ]
      }

      const update = {
         $set: {
            status: 'accepted'
         }
      }

      const updateUser = db.friends.updateOne(updateQueryUser, update);
      const updateOwn = db.friends.updateOne(updateQueryOwn, update);

      Promise.all([
         updateUser,
         updateOwn
      ]).then((res) => {
         socket.emit('acceptFriend', {status: 200, body: data});
      }).catch((err) => {
         socket.emit('acceptFriend', {status: 500});
      })

   });

};
