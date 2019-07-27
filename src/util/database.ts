import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("shop", "root", "11037600", {
  host: "localhost",
  dialect: "mysql"
});
