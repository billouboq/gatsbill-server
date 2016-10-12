'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket, data) => {

   const myId = ObjectID(socket.id);
   const date = new Date();

   let query = {
      username: data
   }

   db.users.findOne(query, (err, user) => {

      if (err) {
         return socket.emit('askFriend', {status: 500});
      }

      if (!user) {
         return socket.emit('askFriend', {status: 400});
      }

      query = {
         $and: [
            {username: data},
            {ownerid: myId}
         ]
      }

      db.friends.count(query, (err, count) => {

         if (err) {
            return socket.emit('askFriend', {status: 500});
         }

         if (count) {
            return socket.emit('askFriend', {status: 400});
         }

         const userFriend = {
            userid: myId,
            username: socket.username,
            date: date,
            status: 'ask',
            ownerid: user._id
         }

         const ownFriend = {
            userid: user._id,
            username: user.username,
            date: date,
            status: 'pending',
            ownerid: myId
         }

         const updateUser = db.friends.insertOne(userFriend);
         const updateMe = db.friends.insertOne(ownFriend);

         Promise.all([
            updateUser,
            updateMe
         ]).then((res) => {
            socket.emit('askFriend', {status: 200, body: ownFriend})
         }).catch((err) => {
            socket.emit('askFriend', {status: 500})
         });

      });

   })

}
