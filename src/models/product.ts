import {Table, Column, Model, HasMany, CreatedAt, UpdatedAt, BelongsToMany} from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
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
}
