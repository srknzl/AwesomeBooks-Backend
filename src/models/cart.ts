import { sequelize } from "../util/database";
import { DataTypes } from "sequelize";

export const Cart = sequelize.define("CartItem", {
  productId: {
    unique: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey : true
  },
  quantity: {
    allowNull: false,
    validate: {
      min: 1
    },
    type: DataTypes.INTEGER
  }
});
