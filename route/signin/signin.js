'use strict';

const express = require('express');
const router = express.Router();

// routes
router.post('/', (req, res) => {
   res.send('Birds signin page');
});

module.exports = router;
