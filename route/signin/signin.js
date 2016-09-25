'use strict';

const express = require('express');
const router = express.Router();

// routes
router.post('/', (req, res) => {
   console.log(req.body);
   res.send('Birds signin page');
});

module.exports = router;
