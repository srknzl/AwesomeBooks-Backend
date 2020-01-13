import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import multer = require("multer");
import multerS3 from "multer-s3";
import aws from "aws-sdk";
const s3Proxy = require("s3-proxy");
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import history from "connect-history-api-fallback";
import expressSSL from "express-sslify";

import authRouter from "./routes/auth";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import productRouter from "./routes/product";

const app = express();
if(process.env.NODE_ENV === "production"){
  app.use(expressSSL.HTTPS({
    trustProtoHeader: true
  }));
}
app.use(history());

let MONGODB_URI;

if (process.env.NODE_ENV === "production") {
  MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@srknzl-m0-development-cluster-hgcsl.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
} else {
  MONGODB_URI = require("./credentials/mongo_uri").MONGODB_URI;
}

aws.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
});

export let s3: undefined | aws.S3 = undefined;

if (aws && aws.config && aws.config.credentials) {
  s3 = new aws.S3({
    accessKeyId: aws.config.credentials.accessKeyId,
    secretAccessKey: aws.config.credentials.secretAccessKey,
    region: 'eu-central-1'
  })
} else {
  throw new Error("Cannot get credentials");
}

app.use(cookieParser());
app.use(bodyParser.json());
// CORS for development

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://www.awesomebook.store");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Cookie,Set-Cookie");
    next();
  });
} else {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Cookie,Set-Cookie");
    next();
  });
}


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


app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.use(helmet());
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
}

app.use(imageUpload.single('image'));

const errorHandler= (err:any, req:any, res:any, next:any) => {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({
    message: err.message,
    error: err
  });
};

app.use(authRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(productRouter);

app.use(errorHandler);

let port: number | string | undefined = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  async err => {
    if (err) console.error(err);
    app.listen(port);
  }
);
