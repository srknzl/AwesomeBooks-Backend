const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get("/add-product", (req, res, next) => {
  //console.log('In add product');
  res.send("<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Submit</form>")
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use("/", (req, res, next) => {
  //console.log('In main page');
  res.send("<h1> In main page</h1>");
});

app.listen(3000, "localhost");