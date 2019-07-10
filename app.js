const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("This always runs");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log('In add product');
  res.send("<h1>In add product page</h1>")
});

app.use("/", (req, res, next) => {
  console.log('In main page');
  res.send("<h1> In main page</h1>");
});

app.listen(3000, "localhost");