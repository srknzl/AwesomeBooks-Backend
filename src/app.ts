import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./util/database";

import * as adminRoutes from "./routes/admin";
import * as userRoutes from "./routes/user";


import * as  notFoundController from './controllers/errors';
import * as  welcomeController from './controllers/welcome';
import { Cart } from "./models/cart";
import { User, UserInterface } from "./models/user";
import { Product } from "./models/product";
import { ProductCart } from "./models/cartproduct";

const app = express();

app.set("views", "views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes.router);
app.use("/user", userRoutes.router);
app.get("/", welcomeController.getWelcomePage);

app.use(notFoundController.getWelcomeNotFound);



sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Product);
Product.belongsTo(User, {constraints: true, onDelete: "CASCADE"});

Cart.belongsToMany(Product, { through: ProductCart});
Product.belongsToMany(Cart,{through: ProductCart});

sequelize
.sync()
//.sync({force: true})
.then((res : any)=>{
  console.log("Synchronization complete.");
  return User.findByPk(1);
})
.then(
  user => {
    if(!user){
      return User.create({
        name: "Serkan Özel"
      });
    }
    return user;
  }
)
.then((user: UserInterface) => {
  return user.createCart({
    quantity: 0
  });
})
.then(cart => {
  app.listen(3000, 'localhost');
})
.catch(
    (err : any)=>{
        console.log(err);
    }
);
