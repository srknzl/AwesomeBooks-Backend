import express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import session from "express-session";
import flash from "connect-flash";
import connectMongoDb from "connect-mongodb-session";

import * as adminRoutes from "./routes/admin";
import * as userRoutes from "./routes/user";
import * as authRoutes from "./routes/auth";
import * as homeRoutes from "./routes/home";
import User from "./models/user";

const app = express();
const MONGODB_URI = "mongodb+srv://srknzl:PaWS1EQ7E85MHMJP@srknzl-m0-development-cluster-hgcsl.mongodb.net/learnnode-shop?retryWrites=true&w=majority";

const MongoDBStore = connectMongoDb(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

store.on('error',(err)=> {
  console.error(err);
})

app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret:
      "UlEuikYPJivAXVMR5KUX24bDU202JkQgv0QrctQRRFEIHrktim1yMgWTI3gwKhbXsnWiNfufv",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(async (req,res,next) => {
  if(req.session && req.session.user){
    try {
      req.session.user = await User.findById(req.session.user._id);
    } catch (error) {
      console.error(error);
    }
  }
  next();
});
app.use(flash());

app.use("/admin", adminRoutes.router);
app.use("/user", userRoutes.router);
app.use(authRoutes.router);
app.use(homeRoutes.router);

connect(
  MONGODB_URI,
  async err => {
    if (err) console.error(err);
    app.listen(3000, "localhost");
  }
);
