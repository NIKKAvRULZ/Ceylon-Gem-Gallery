const express = require('express');
const router = express.Router();

// GET Home Page
router.get('/', (req, res) => {
  res.send('Welcome to Ceylon Gem Gallery Home Page');
});

module.exports = router;
