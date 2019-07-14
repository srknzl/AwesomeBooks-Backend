const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render('shop',
  {
    pageTitle: "Shop",
    active: "shop"
  }); // __dirname is the current file's location
});

module.exports = router;