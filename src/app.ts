import express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import session from "express-session";

import * as adminRoutes from "./routes/admin";
import * as userRoutes from "./routes/user";
import * as authRoutes from "./routes/auth";
import * as homeRoutes from "./routes/home";

const app = express();

app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret:
      "UlEuikYPJivAXVMR5KUX24bDU202JkQgv0QrctQRRFEIHrktim1yMgWTI3gwKhbXsnWiNfufv",
    resave: false,
    saveUninitialized: false
  })
);

app.use("/admin", adminRoutes.router);
app.use("/user", userRoutes.router);
app.use(authRoutes.router);
app.use(homeRoutes.router);

connect(
  "mongodb+srv://srknzl:PaWS1EQ7E85MHMJP@srknzl-m0-development-cluster-hgcsl.mongodb.net/learnnode-shop?retryWrites=true&w=majority",
  async err => {
    if (err) console.error(err);
    app.listen(3000, "localhost");
  }
);
