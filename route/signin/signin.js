'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../database/mongo').collections;

// routes
router.post('/', (req, res) => {
   db.users.find();
   db.users.findOne();
   console.log(req.body);
   res.send('Birds signin page');
});

module.exports = router;
