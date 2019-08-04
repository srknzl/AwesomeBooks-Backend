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
  // product: Schema.Types.ObjectId | IProduct;
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
  }
});

userSchema.methods.addToCart = async function (productId: string) {
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

userSchema.methods.removeOneFromCart = async function (productId: string) {
  const prod = await Product.findById(productId);
  if (prod) {
    const index = this.cart.items.findIndex(
      (i: any) => i.product.toString() === productId);
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
}
userSchema.methods.removeAllFromCart = async function (productId: string) {
  const prod = await Product.findById(productId);
  if (prod) {
    const index = this.cart.items.findIndex(
      (i: any) => i.product.toString() === productId);
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
}
userSchema.methods.emptyCart = async function () {
  this.cart.items = [];
  await this.save();
}
userSchema.methods.order = async function (address: string) {
  const items = this.cart.items;
  const orderItems : IOrderItem[] = [];
  

  //temp
  if(!address) address = "Konya";
  
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
}

const User = model<IUser>("User", userSchema);
export default User;

// import { ObjectId } from "mongodb";

// export interface UserInterface {
//     username: string;
//     email: string;
//     _id: ObjectId | null;
//     cart: CartInterface;
// }
// export interface CartItemInterface {
//     quantity: number;
//     productId: ObjectId;
// }

// export interface CartInterface {
//     items: CartItemInterface[];
// }

// export class User {
//     username: string;
//     email: string;
//     _id: ObjectId | null;
//     cart: CartInterface;

//     constructor(username: string,
//         email: string,
//         cart: CartInterface,
//         id?: string
//     ) {
//         this._id = id ? new ObjectId(id) : null;
//         this.username = username;
//         this.email = email;
//         this.cart = cart;
//     }

//     async save(): Promise<any> {
//         const db = getDb();
//         const users = db.collection('users');

//         if (this._id) {
//             await users.updateOne({
//                 _id: this._id
//             }, {
//                     $set: this
//                 });
//         } else {
//             await users.insertOne(this);
//         }
//     }
//     async addToCart(productId: ObjectId) {
//         const db = getDb();
//         const users = db.collection('users');
//         try {
//             const user: UserInterface | null = await users.findOne({
//                 _id: this._id
//             });
//             if (user) {
//                 const index = user.cart.items.findIndex(pr => {
//                     return pr.productId.toHexString() === productId.toHexString();
//                 });
//                 if (index === -1) { // Add to cart for the first time
//                     user.cart.items.push({
//                         productId: productId,
//                         quantity: 1
//                     });
//                 } else {
//                     user.cart.items[index].quantity++;
//                 }
//                 this.cart = user.cart;

//                 await this.save();
//             }else {
//                 throw "No user of the cart";
//             }
//         } catch (err) {
//             throw err;
//         }
//     }
//     async getCart() {
//         const db = getDb();
//         const products = db.collection('products');
//         try {
//             const prods: ProductInterface[] = await products.find({
//                 _id: {
//                     $in: this.cart.items.map(i => i.productId)
//                 }
//             }).toArray();

//             if(this.cart.items.length !== prods.length){
//                 await this.emptyCart();
//                 return [];
//             }else {
//                 return prods.map(p => {
//                     //@ts-ignore to ignore possible null
//                     return { ...p, quantity: this.cart.items.find(i => i.productId.toHexString() === p._id.toHexString()).quantity };
//                 });
//             }
//         } catch (err) {
//             throw err;
//         }
//     }
//     async removeAllFromCart(productId: string) {
//         const db = getDb();
//         const users = db.collection('users');
//         try{
//             const user : UserInterface | null = await users.findOne({
//                 _id: this._id
//             });
//             if(user){
//                 const index = user.cart.items.findIndex(i => i.productId.toHexString() === productId);
//                 if (index === -1) {
//                     throw "Cart item not found error";
//                 } else {
//                     user.cart.items.splice(index, 1);
//                     this.cart = user.cart;
//                     await this.save();
//                 }
//             }else {
//                 throw "No user of the cart";
//             }
//         }catch(err){
//             throw err;
//         }
//     }
//     async removeOneFromCart(productId: string) {
//         const db = getDb();
//         const users = db.collection('users');

//         try{
//             const user : UserInterface | null = await users.findOne({
//                 _id: this._id
//             });
//             if(user){
//                 const index = user.cart.items.findIndex(i => i.productId.toHexString() === productId);
//                 if (index === -1) {
//                     throw "Cart item not found error";
//                 } else {
//                     if (user.cart.items[index].quantity > 1) {
//                         user.cart.items[index].quantity--;
//                     } else if (user.cart.items[index].quantity === 1) {
//                         user.cart.items.splice(index, 1);
//                     } else {
//                         throw "Invalid cart item quantity";
//                     }
//                     this.cart = user.cart;
//                     await this.save();
//                 }
//             }else{
//                 throw "No user of the cart";
//             }
//         }catch(err){
//             throw err;
//         }
//     }
//     async emptyCart(){
//         const db = getDb();
//         const users = db.collection('users');
//         try{
//             await users.updateOne({
//                 _id: this._id
//             },{
//                 $set: {
//                     cart: {items: []}
//                 }
//             });
//             this.cart.items = [];
//         }catch(err){
//             throw err;
//         }

//     }
//     async order(){
//         const db = getDb();
//         const ordersCol = db.collection('orders');
//         try{
//             const cart = await this.getCart();
//             const order = {
//                 items: cart,
//                 userId: this._id
//             };
//             await ordersCol.insertOne(order);
//             await this.emptyCart();
//         }catch(err){
//             console.log(err);
//         }
//     }
//     async getOrders(){
//         const db = getDb();
//         const ordersCol = db.collection('orders');
//         try{
//             const orders = await ordersCol.find({
//                 userId: this._id
//             }).toArray();
//             return orders;
//         }catch(err){
//             console.log(err);
//         }
//     }
//     static findById(id: string): Promise<any> {
//         const db = getDb();
//         const users = db.collection('users');

//         return users.findOne({
//             _id: new ObjectId(id)
//         });
//     }

// }
