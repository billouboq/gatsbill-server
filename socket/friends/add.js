'use strict';

const db = require('../../database/mongo').collections;
const ObjectID = require('mongodb').ObjectID;

module.exports = (socket, data) => {

   const query = {
      $and: [
         {username: data},
         {_id: {$ne: ObjectID(socket.id)}}
      ]
   }

   db.users.findOne(query, (err, user) => {
      console.log(user);
   });

};
