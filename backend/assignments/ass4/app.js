const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.use(router);

app.listen(3000);