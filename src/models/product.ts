import { Model, DataTypes } from "sequelize";
import { BuildOptions } from "sequelize";

import { sequelize } from "../util/database";

export interface ProductInterface extends Model {
  readonly id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type ProductStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductInterface;
}
export const Product = <ProductStatic>sequelize.define('product', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: new DataTypes.DECIMAL(2)
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  imageUrl: {
    allowNull: false,
    type: DataTypes.TEXT
  }
});