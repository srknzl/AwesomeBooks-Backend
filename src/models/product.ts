import { Schema, model,Document } from "mongoose";

export interface IProduct extends Document{
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  user: Schema.Types.ObjectId;
}

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Product = model<IProduct>('Product',productSchema);
export default Product;

// export interface ProductInterface {
//   title: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   _id: ObjectId;
//   userId: string;
// }

// export class Product {
//   title: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   _id?: ObjectId | null;
//   userId: string;

//   constructor(
//     title: string,
//     price: number,
//     description: string,
//     imageUrl: string,
//     userId: string,
//     id?: ObjectId,
//   ) {
//     this.title = title;
//     this.price = Number(price);
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ?  new ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() : Promise<any> {
//     const db = getDb();
//     let dbOp;
//     const products = db.collection("products");
//     console.log(this._id);
//     if(this._id){
//       dbOp =  products.updateOne({
//         _id: this._id
//       },{
//         $set: this
//       });
//     }else{
//       dbOp = products.insertOne(this);
//     }

//     return dbOp;
//   }
//   static fetchAll() : Promise<ProductInterface[]> {
//     const db = getDb();
//     const products = db.collection("products");
//     return products.find().toArray();
//   }
//   static findById(id: string) : Promise<ProductInterface> {
//     const db = getDb();
//     const product = db.collection("products");
//     return product
//       .find({
//         _id: new ObjectId(id)
//       })
//       .next();
//   }
//   static deleteOne(id : string) :  Promise<DeleteWriteOpResultObject>{
//     const db = getDb();
//     const product = db.collection("products");
//     return product.deleteOne({
//       _id: new ObjectId(id)
//     });
//   }
// }
