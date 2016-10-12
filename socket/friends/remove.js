'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket, data) => {

   const myId = ObjectID(socket.id);
   const userId = ObjectID(data);

   const removeQueryUser = {
      $and: [
         {ownerid: userId},
         {userid: myId}
      ]
   }

   const removeQueryOwn = {
      $and: [
         {ownerid: myId},
         {userid: userId}
      ]
   }

   const removeUser = db.friends.deleteOne(removeQueryUser);
   const removeOwn = db.friends.deleteOne(removeQueryOwn);

   Promise.all([
      removeUser,
      removeOwn
   ]).then((res) => {
      socket.emit('removeFriend', {status: 200, body: data});
   }).catch((err) => {
      socket.emit('removeFriend', {status: 500});
   })

};
