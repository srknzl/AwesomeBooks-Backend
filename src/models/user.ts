import { Schema, model, Document } from "mongoose";
import Product, { IProduct } from "./product";
import Order, { IOrderItem } from "./order";

export interface ICartItem {
  product: Schema.Types.ObjectId | IProduct;
  quantity: number;
}
export interface ICart {
  items: ICartItem[];
}

export interface IUser extends Document {
  name: string;
  email: string;
  cart: ICart;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product"
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiry: Schema.Types.Date
});

userSchema.methods.addToCart = async function(productId: string) {
  const prod = await Product.findById(productId);
  if (prod) {
    const index = this.cart.items.findIndex(
      (i: any) => i.product.toString() === productId
    );
    if (index === -1) {
      this.cart.items.push({
        quantity: 1,
        product: prod._id
      });
    } else {
      this.cart.items[index].quantity++;
    }
    this.markModified("cart");
    await this.save();
  } else {
    throw "Product not found!";
  }
};

userSchema.methods.removeOneFromCart = async function(productId: string) {
  const prod = await Product.findById(productId);
  if (prod) {
    const index = this.cart.items.findIndex(
      (i: any) => i.product.toString() === productId
    );
    if (index === -1) {
      return;
    } else {
      if (this.cart.items[index].quantity > 1) {
        this.cart.items[index].quantity--;
      } else {
        this.cart.items.splice(index, 1);
      }
    }
    this.markModified("cart");
    await this.save();
  } else {
    throw "Product not found!";
  }
};
userSchema.methods.removeAllFromCart = async function(productId: string) {
  const prod = await Product.findById(productId);
  if (prod) {
    const index = this.cart.items.findIndex(
      (i: any) => i.product.toString() === productId
    );
    if (index === -1) {
      return;
    } else {
      this.cart.items.splice(index, 1);
    }
    this.markModified("cart");
    await this.save();
  } else {
    throw "Product not found!";
  }
};
userSchema.methods.emptyCart = async function() {
  this.cart.items = [];
  await this.save();
};
userSchema.methods.order = async function(address: string) {
  const items = this.cart.items;
  const orderItems: IOrderItem[] = [];

  //temp
  if (!address) address = "Konya";

  items.forEach((item: ICartItem) => {
    orderItems.push({
      quantity: item.quantity,
      product: item.product
    });
  });
  const order = new Order({
    items: orderItems,
    user: this._id,
    address: address,
    orderDate: new Date()
  });

  await order.save();
  await this.emptyCart();
};

const User = model<IUser>("User", userSchema);
export default User;
