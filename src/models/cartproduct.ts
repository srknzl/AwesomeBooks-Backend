import { Model, DataTypes } from "sequelize";
import { BuildOptions } from "sequelize";

import { sequelize } from "../util/database";

interface ProductCartInterface extends Model {
  readonly id: number;
  quantity: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type ProductCartStatic  = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductCartInterface;
}
export const ProductCart = <ProductCartStatic>sequelize.define('productcart', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER.UNSIGNED,
    validate: {
      min: 1
    }
  }
});