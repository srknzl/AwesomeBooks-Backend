import { Schema, model,Document } from "mongoose";
import { IUser } from "./user";
import { IProduct } from "./product";

export interface IOrderItem {
  product: IProduct | Schema.Types.ObjectId;
  quantity: number;
  address: string;
  orderDate: Date;
}

export interface IOrder extends Document{
  items: IOrderItem[];
  user: IUser |  Schema.Types.ObjectId;
}

const orderSchema = new Schema({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      orderDate: {
        type: Date,
        required: true
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Order = model<IOrder>('Order',orderSchema);
export default Order;

