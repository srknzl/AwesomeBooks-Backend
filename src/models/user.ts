import {Table, Column, Model, HasMany, CreatedAt, UpdatedAt, HasOne} from 'sequelize-typescript';
import Product from './product';
import Cart from './cart';

@Table
export default class User extends Model<User> {

  @Column
  name!: string;
  
  @Column
  email!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(()=>Product)
  products?: Product[];

  @HasOne(()=>Cart)
  cart!: Cart;
}
