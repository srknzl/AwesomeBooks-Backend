import { getDb } from "../util/database";
import { ObjectId } from "mongodb";
import { ProductInterface } from "./product";

export interface UserInterface {
    username: string;
    email: string;
    _id: ObjectId | null;
    cart: CartInterface;
}
export interface CartItemInterface {
    quantity: number;
    productId: ObjectId;
}

export interface CartInterface {
    items: CartItemInterface[];
}

export class User {
    username: string;
    email: string;
    _id: ObjectId | null;
    cart: CartInterface;


    constructor(username: string,
        email: string,
        cart: CartInterface,
        id?: string
    ) {
        this._id = id ? new ObjectId(id) : null;
        this.username = username;
        this.email = email;
        this.cart = cart;
    }

    save(): Promise<any> {
        const db = getDb();
        const users = db.collection('users');

        if (this._id) {
            return users.updateOne({
                _id: this._id
            }, {
                    $set: this
                });
        } else {
            return users.insertOne(this);
        }
    }
    async addToCart(productId: ObjectId) {
        const db = getDb();
        const users = db.collection('users');
        try {
            const user: UserInterface | null = await users.findOne({
                _id: this._id
            });
            if (user) {
                const index = user.cart.items.findIndex(pr => {
                    return pr.productId.toHexString() === productId.toHexString();
                });
                if (index === -1) { // Add to cart for the first time
                    user.cart.items.push({
                        productId: productId,
                        quantity: 1
                    });
                } else {
                    user.cart.items[index].quantity++;
                }
                this.cart = user.cart;

                return this.save();
            }else {
                throw "No user of the cart";
            }
        } catch (err) {
            throw err;
        }
    }
    async getCart() {
        const db = getDb();
        const products = db.collection('products');
        try {
            const prods: ProductInterface[] = await products.find({
                _id: {
                    $in: this.cart.items.map(i => i.productId)
                }
            }).toArray();
            return prods.map(p => {
                //@ts-ignore to ignore possible null
                return { ...p, quantity: this.cart.items.find(i => i.productId.toHexString() === p._id.toHexString()).quantity };
            });
        } catch (err) {
            throw err;
        }
    }
    async removeAllFromCart(productId: string) {
        const db = getDb();
        const users = db.collection('users');
        try{
            const user : UserInterface | null = await users.findOne({
                _id: this._id
            });
            if(user){
                const index = user.cart.items.findIndex(i => i.productId.toHexString() === productId);
                if (index === -1) {
                    throw "Cart item not found error";
                } else {
                    user.cart.items.splice(index, 1);
                    this.cart = user.cart;
                    return this.save();
                }
            }else {
                throw "No user of the cart";
            }
        }catch(err){
            throw err;
        }
    }
    async removeOneFromCart(productId: string) {
        const db = getDb();
        const users = db.collection('users');

        try{
            const user : UserInterface | null = await users.findOne({
                _id: this._id
            });
            if(user){
                const index = user.cart.items.findIndex(i => i.productId.toHexString() === productId);
                if (index === -1) {
                    throw "Cart item not found error";
                } else {
                    if (user.cart.items[index].quantity > 1) {
                        user.cart.items[index].quantity--;
                    } else if (user.cart.items[index].quantity === 1) {
                        user.cart.items.splice(index, 1);
                    } else {
                        throw "Invalid cart item quantity";
                    }
                    this.cart = user.cart;
                    return this.save();
                }
            }else{
                throw "No user of the cart";
            }
        }catch(err){
            throw err;
        }
    }
    static findById(id: string): Promise<any> {
        const db = getDb();
        const users = db.collection('users');

        return users.findOne({
            _id: new ObjectId(id)
        });
    }

} 