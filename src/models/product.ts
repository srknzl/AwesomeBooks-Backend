import { getDb } from "../util/database";
import { ObjectId, DeleteWriteOpResultObject } from "mongodb";

export class Product {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  _id?: ObjectId | null;
  userId: string;

  constructor(
    title: string,
    price: number,
    description: string,
    imageUrl: string,
    userId: string,
    id?: ObjectId
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ?  new ObjectId(id) : null;
    this.userId = userId;
  }

  save() : Promise<any> {
    const db = getDb();
    let dbOp;
    const products = db.collection("products");

    if(this._id){
      dbOp =  products.updateOne({
        _id: this._id
      },{
        $set: this
      });
    }else{
      dbOp = products.insertOne(this);
    }

    return dbOp;
  }
  static fetchAll() : Promise<any[]> {
    const db = getDb();
    const products = db.collection("products");
    return products.find().toArray();
  }
  static findById(id: string) : Promise<any> {
    const db = getDb();
    const product = db.collection("products");
    return product
      .find({
        _id: new ObjectId(id)
      })
      .next();
  }
  static deleteOne(id : string) :  Promise<DeleteWriteOpResultObject>{
    const db = getDb();
    const product = db.collection("products");
    return product.deleteOne({
      _id: new ObjectId(id)
    });
  }
}
