const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.render('add-product',{
    pageTitle: "Add Product"
  });
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;