'use strict';

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require('../../config');
const db = require('../../database/mongo').collections;
const keysIn = require('../../helpers/utils').keysIn;

// routes
router.post('/', (req, res) => {

   if (!keysIn(req.body, ['username', 'email', 'password', 'confirmpassword'])) {
      return res.status(400).json({msg: 'Missing parameters'});
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

      db.users.save(req.body, (err) => {

         if (err) {
            return res.status(500).end();
         }

         const token = jwt.sign(req.body.username, config.jwt.secret);

         res.json({token});

      })

   });

});

module.exports = router;
