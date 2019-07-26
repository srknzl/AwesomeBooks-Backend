import {Table, Column, Model, HasMany, CreatedAt, UpdatedAt, HasOne} from 'sequelize-typescript';
import { Product } from './product';
import { User } from './user';

@Table
export default class Cart extends Model<Cart> {

  @Column
  quantity!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(()=>Product)
  products?: Product[];

  @HasOne(()=>User)
  user!: User;
}
