import { Model, DataTypes } from "sequelize";
import { BuildOptions } from "sequelize";

import { sequelize } from "../util/database";

export interface CartInterface extends Model {
  readonly id: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type CartStatic  = typeof Model & {
  new (values?: object, options?: BuildOptions): CartInterface;
}
export const Cart = <CartStatic>sequelize.define('cart', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true
  }
});