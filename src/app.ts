import express from "express";
import bodyParser from "body-parser";

import * as adminRoutes from "./routes/admin";
import * as userRoutes from "./routes/user";

import * as notFoundController from "./controllers/errors";
import * as welcomeController from "./controllers/welcome";
import { mongoConnect } from "./util/database";
import { User } from "./models/user";

const app = express();

app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req,res,next)=>{
  User.findById("5d3e9f672684df244cbb45a1")
  .then(
    user => {
      (req as any).user = user;
      next();
    }
  )
  .catch(err => {
    throw err;
  });
});

app.use("/admin", adminRoutes.router);
app.use("/user", userRoutes.router);
app.get("/", welcomeController.getWelcomePage);


app.use(notFoundController.getWelcomeNotFound);

mongoConnect(()=> {
  app.listen(3000, "localhost");
});
