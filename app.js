const express = require('express');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const notFoundController = require('./controllers/errors');
const welcomeController = require('./controllers/welcome');

const app = express();

app.set('views','views');
app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.get('/',welcomeController.getWelcomePage);

app.use(notFoundController.getWelcomeNotFound);

app.listen(3001, 'localhost');
