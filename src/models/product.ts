import { sequelize } from "../util/database";
import { DataTypes } from "sequelize";

export const Product = sequelize.define("Product", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  price:{
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  imageUrl: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  description : {
    allowNull: false,
    type: DataTypes.TEXT
  }
});
