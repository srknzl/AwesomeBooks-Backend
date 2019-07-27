import { Model, DataTypes } from "sequelize";
import { BuildOptions } from "sequelize";

import { sequelize } from "../util/database";

interface CartItemInterface extends Model {
  readonly id: number;
  quantity: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type CartItemStatic  = typeof Model & {
  new (values?: object, options?: BuildOptions): CartItemInterface;
}
export const CartItem = <CartItemStatic>sequelize.define('cartitem', {
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