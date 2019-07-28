import express from "express";
import bodyParser from "body-parser";

import * as adminRoutes from "./routes/admin";
import * as userRoutes from "./routes/user";

import * as notFoundController from "./controllers/errors";
import * as welcomeController from "./controllers/welcome";
import { mongoConnect } from "./util/database";
import { MongoClient } from "mongodb";

const app = express();

app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/admin", adminRoutes.router);
app.use("/user", userRoutes.router);
app.get("/", welcomeController.getWelcomePage);

app.use(notFoundController.getWelcomeNotFound);

mongoConnect((client : MongoClient)=> {
  app.listen(3000, "localhost");
});
