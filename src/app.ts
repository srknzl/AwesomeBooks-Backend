import express, { ErrorRequestHandler } from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import csrf from "csurf";
import multer = require("multer");
import multerS3 from "multer-s3";
import aws from "aws-sdk";
const s3Proxy = require("s3-proxy");
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

const app = express();


let MONGODB_URI;

if (process.env.NODE_ENV === "production") {
  MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@srknzl-m0-development-cluster-hgcsl.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
} else {
  MONGODB_URI = require("./credentials/mongo_uri").MONGODB_URI;
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"..","frontend","dist")));

app.use(helmet());
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
}

app.use(imageUpload.single('image'));
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    error: err
  });
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
