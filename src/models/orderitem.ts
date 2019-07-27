import { Model, DataTypes } from "sequelize";
import { BuildOptions } from "sequelize";

import { sequelize } from "../util/database";

export interface OrderItemInterface extends Model {
  readonly id: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type OrderItemStatic  = typeof Model & {
  new (values?: object, options?: BuildOptions): OrderItemInterface;
}
export const OrderItem = <OrderItemStatic>sequelize.define('orderitem', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true
  }
});