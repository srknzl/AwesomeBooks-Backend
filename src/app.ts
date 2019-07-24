import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./util/database";

import * as adminRoutes from "./routes/admin";
import * as userRoutes from "./routes/user";


import * as  notFoundController from './controllers/errors';
import * as  welcomeController from './controllers/welcome';

const app = express();

app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/admin", adminRoutes.router);
app.use("/user", userRoutes.router);
app.get("/", welcomeController.getWelcomePage);

app.use(notFoundController.getWelcomeNotFound);

sequelize.sync()
.then((res : any)=>{
    //console.log(res);
})
.catch(
    (err : any)=>{
        console.log(err);
    }
);
app.listen(3001, 'localhost');
