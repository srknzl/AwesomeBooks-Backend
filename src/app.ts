import express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import session from "express-session";

import * as adminRoutes from "./routes/admin";
import * as userRoutes from "./routes/user";

import * as notFoundController from "./controllers/errors";
import * as welcomeController from "./controllers/welcome";
import User, { IUser } from "./models/user";

const app = express();

app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: 'UlEuikYPJivAXVMR5KUX24bDU202JkQgv0QrctQRRFEIHrktim1yMgWTI3gwKhbXsnWiNfufv',
  resave: false,
  saveUninitialized: false
}))

app.use(async (req, res, next) => {
  try {
    const user: IUser | null = await User.findById("5d40946927860429a7955209");
    if (user) {
      (req as any).user = user;
    }
  } catch (err) {
    throw err;
  }
  next();
});

app.use("/admin", adminRoutes.router);
app.use("/user", userRoutes.router);
app.get("/", welcomeController.getWelcomePage);

app.use(notFoundController.getWelcomeNotFound);

connect(
  "mongodb+srv://srknzl:PaWS1EQ7E85MHMJP@srknzl-m0-development-cluster-hgcsl.mongodb.net/learnnode-shop?retryWrites=true&w=majority",
  async (err) => {
    if(err) console.error(err);
    try {
      let user: IUser | null = await User.findById("5d40946927860429a7955209");
      if (!user) {
        user = new User({
          name: "Serkan Özel",
          email: "serkan.ozel@boun.edu.tr"
        });
        await user.save();
      }
    } catch (err) {
      throw err;
    }
    app.listen(3000, "localhost");
  }
);
