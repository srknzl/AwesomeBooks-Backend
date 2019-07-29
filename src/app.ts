import express from "express";
import bodyParser from "body-parser";

import * as adminRoutes from "./routes/admin";
import * as userRoutes from "./routes/user";

import * as notFoundController from "./controllers/errors";
import * as welcomeController from "./controllers/welcome";
import { mongoConnect } from "./util/database";
import { User, UserInterface } from "./models/user";
import { ObjectId, ObjectID } from "bson";

const app = express();

app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req,res,next)=>{
  User.findById('5d3ece6644ba801c6862770c')
  .then(
    (user: UserInterface) => {
      if(!user){
        (req as any).user = new User('srknzl','serkan.ozel@boun.edu.tr',{items:[]},"5d3ece6644ba801c6862770c");
        (req as any).user.save()
        .then(
          ()=>{
            next();
          }
        )
        .catch(
          (err : Error) => {
            throw err;
          }
        );
      }else {
        User.findById("5d3ece6644ba801c6862770c")
        .then(
          (user: UserInterface) => {
            (req as any).user = new User(user.username,user.email,user.cart,(user._id as ObjectID).toHexString());
            next();
          }
        )
        .catch(
          (err : Error)=>{
            throw err;
          }
        );
     
      }
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
