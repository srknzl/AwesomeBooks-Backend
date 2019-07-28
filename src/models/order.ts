import { Model, DataTypes } from "sequelize";
import { BuildOptions } from "sequelize";

import { sequelize } from "../util/database";

export interface OrderInterface extends Model {
  readonly id: number;
  address: string;
  quantity: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type OrderStatic  = typeof Model & {
  new (values?: object, options?: BuildOptions): OrderInterface;
}
export const Order = <OrderStatic>sequelize.define('order', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true
  },
  address: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  quantity: {
    allowNull: false, 
    type: DataTypes.INTEGER.UNSIGNED,
    validate: {
      min : 1
    }
  }
});