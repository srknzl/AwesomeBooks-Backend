import {Table, Column, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import User from "./user";

@Table
export default class Product extends Model<Product> {
  @Column
  title!: string;

  @Column
  price!: number;

  @Column
  imageUrl!: string;

  @Column
  description!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}