import express, { ErrorRequestHandler } from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import session from "express-session";
import flash from "connect-flash";
import connectMongoDb from "connect-mongodb-session";
import csrf from "csurf";
import multer = require("multer");
import multerS3 from "multer-s3";
import aws from "aws-sdk";
const s3Proxy = require("s3-proxy");
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import * as adminRoutes from "./routes/admin";
import * as userRoutes from "./routes/user";
import * as authRoutes from "./routes/auth";
import * as homeRoutes from "./routes/home";
import User from "./models/user";
import Admin from "./models/admin";


const app = express();


let MONGODB_URI;
let expressSessionSecret;

if (process.env.NODE_ENV === "production") {
  MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@srknzl-m0-development-cluster-hgcsl.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
} else {
  MONGODB_URI = require("./credentials/mongo_uri").MONGODB_URI;
}

if (process.env.NODE_ENV === "production") {
  expressSessionSecret = process.env.EXPRESS_SESSION_SECRET;
} else {
  expressSessionSecret = require("./credentials/expressSession").expressSessionSecret;
}

aws.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
});

export let s3 : undefined | aws.S3 = undefined;

if(aws && aws.config && aws.config.credentials){
  s3 = new aws.S3({
    accessKeyId: aws.config.credentials.accessKeyId,
    secretAccessKey: aws.config.credentials.secretAccessKey,
    region: 'eu-central-1'
  })
}else {
  throw new Error("Cannot get credentials");
}

const MongoDBStore = connectMongoDb(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});
const csrfProtection = csrf();

const s3Storage = multerS3(
  {
    s3: s3,
    bucket: "awesomebooks",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, "media/images/" + new Date().getTime() + "_" + file.originalname)
    }
  }
);

app.get('/media/*', s3Proxy({
  bucket: 'awesomebooks',
  accessKeyId: aws.config.credentials.accessKeyId,
  secretAccessKey: aws.config.credentials.secretAccessKey,
  overrideCacheControl: 'max-age=100000',
  defaultKey: false
}));

const imageUpload = multer({
  storage: s3Storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Png,jpg and jpeg are supported only."), false);
    }
  }
});


store.on("error", err => {
  console.error(err);
});

app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(helmet());
app.use(compression());
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
}

app.use(
  session({
    secret: expressSessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(imageUpload.single('image'));
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
  res.locals.userLoggedIn = (req as any).session.user;
  res.locals.csrfToken = req.csrfToken();
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
})
app.use(async (req, res, next) => {
  if (req.session && req.session.user) {
    try {
      req.session.user = await User.findById(req.session.user._id);
    } catch (error) {
      console.error(error);
    }
  } else if (req.session && req.session.admin) {
    try {
      req.session.admin = await Admin.findById(req.session.admin._id);
    } catch (error) {
      console.error(error);
    }
  }
  next();
});

app.use("/admin", adminRoutes.router);
app.use("/user", userRoutes.router);
app.use(authRoutes.router);
app.use(homeRoutes.router);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.redirect('/500');
};

app.use(errorHandler);

let port: number | string | undefined = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

connect(
  MONGODB_URI,
  async err => {
    if (err) console.error(err);
    app.listen(port);
  }
);
