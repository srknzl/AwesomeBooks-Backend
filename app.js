const express = require('express');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const notFoundController = require('./controllers/errors');

const app = express();

app.set('views','views');
app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(adminRouter);
app.use(shopRouter);

app.use('/', notFoundController.getNotFound);

app.listen(3000, 'localhost');
