import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("shop_db", "serkan", "11037600", {
  host: "localhost",
  dialect: "mysql"
});
