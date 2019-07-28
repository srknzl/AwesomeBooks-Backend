import { Model, DataTypes } from "sequelize";
import { BuildOptions } from "sequelize";

import { sequelize } from "../util/database";

export interface OrderItemInterface extends Model {
}

// Need to declare the static model so `findOne` etc. use correct types.
type OrderItemStatic  = typeof Model & {
  new (values?: object, options?: BuildOptions): OrderItemInterface;
}
export const OrderItem = <OrderItemStatic>sequelize.define('orderitem', {
});