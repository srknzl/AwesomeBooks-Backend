import { sequelize } from "../util/database";
import { DataTypes, Model, BuildOptions } from "sequelize";

export interface Product extends Model {
  readonly id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

type ProductStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Product;
};

export const ProductModel = <ProductStatic>sequelize.define(
  "product",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }
);
