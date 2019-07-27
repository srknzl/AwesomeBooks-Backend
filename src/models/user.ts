import { Model, DataTypes } from "sequelize";
import { BuildOptions } from "sequelize";

import { sequelize } from "../util/database";

export interface UserInterface extends Model {
  readonly id: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type UserStatic  = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInterface;
}
export const User = <UserStatic>sequelize.define('user', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
});