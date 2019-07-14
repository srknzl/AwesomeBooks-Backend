const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const expressHandlebars = require("express-handlebars");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

app.engine('hbs',expressHandlebars());
app.set('views','views');
app.set('view engine','hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(adminRouter);
app.use(shopRouter);
app.use('/', (req,res,next) => {
  res.status(404).render('not-found',{
    pageTitle: "Not found",
    styles: [
      {url: "/styles/not-found.css"}
    ]
  });
});

app.listen(3000, "localhost");
