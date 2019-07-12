const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(adminRouter);
app.use(shopRouter);
app.use('/', (req,res,next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
});

app.listen(3000, "localhost");
