'use strict';

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require('../../config');
const db = require('../../database/mongo').collections;
const keysIn = require('../../helpers/utils').keysIn;
const verifyPassword = require('../../helpers/utils').verifyPassword;

// routes
router.post('/', (req, res) => {

   if (!keysIn(req.body, ['username', 'password'])) {
      return res.status(400).json({msg: 'Missing parameters'});
   }

   db.users.findOne({username: req.body.username}, (err, user) => {

      if (err) {
         return res.status(500).end();
      }

      // no user with username
      if (!user) {
         return res.status(400).json({msg: 'Incorrect username'});
      }

      // password is incorrect
      if (!verifyPassword(req.body.password, user.password.buffer)) {
         return res.status(400).json({msg: 'Incorrect password'});
      }

      const token = jwt.sign({
         _id: user._id.toString(),
         username: user.username
      }, config.jwt.secret);

      res.json({token, user});

   });

});

module.exports = router;
