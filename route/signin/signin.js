'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../database/mongo').collections;
const keysIn = require('../../helpers/utils').keysIn;

// routes
router.post('/', (req, res) => {

   if (!keysIn(req.body, ['username', 'password'])) {
      return res.status(400).json({msg: 'Missing parameters'});
   }

   db.users.findOne({username: req.body.username}, (err, user) => {

      if (err) {
         return res.status(500).end();
      }

      console.log(user);
      res.end();

   });

});

module.exports = router;
