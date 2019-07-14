const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render('shop',
  {
    pageTitle: "Shop",
    styles: [
      {url: "/styles/shop.css"}
    ],
    prods: products
  });
});

module.exports = router;