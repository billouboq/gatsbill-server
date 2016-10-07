'use strict';

const db = require('../../database/mongo').collections;

module.exports = (socket, data) => {

   console.log('remove friend');
   console.log(data);

   const query = {
      username: data
   };

   db.users.deleteOne(query, (err, result) => {
      console.log(err);
      console.log(result);
   });

};
