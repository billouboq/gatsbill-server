'use strict';

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require('../../config');
const db = require('../../database/mongo').collections;
const keysIn = require('../../helpers/utils').keysIn;
const signPassword = require('../../helpers/utils').signPassword;

// routes
router.post('/', (req, res) => {

   if (!keysIn(req.body, ['username', 'email', 'password', 'confirmpassword'])) {
      return res.status(400).json({msg: 'Missing parameters'});
   }

   if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({msg: 'Passwords are not the same'});
   }

   const query = {
      $or: [
         {username: req.body.username},
         {email: req.body.email}
      ]
   }

   db.users.findOne(query, (err, user) => {

      if (err) {
         return res.status(500).end();
      }

      if (user) {

         // username is allready used
         if (user.username === req.body.username) {
            return res.status(400).json({msg: 'Username allready exist'});
         }

         // email is allready used
         if (user.email === req.body.mail) {
            return res.status(400).json({msg: 'Email allready exist'});
         }

      }

      // create sign password
      const data = {
         username: req.body.username,
         email: req.body.email,
         password: signPassword(req.body.password),
         friends: []
      };

      db.users.insertOne(data, (err, result) => {

         if (err) {
            return res.status(500).end();
         }

         const user = result.ops[0];
         delete user.password;

         const token = jwt.sign({
            _id: result.insertedId.toString(),
            username: req.body.username
         }, config.jwt.secret);

         res.json({token, user});

      })

   });

});

module.exports = router;
