import { getDb } from "../util/database";
import { ObjectId } from "mongodb";

export class Product {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  _id?: ObjectId;

  constructor(
    title: string,
    price: number,
    description: string,
    imageUrl: string,
    id?: ObjectId
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new ObjectId(id);
  }

  save() {
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
  static fetchAll() {
    const db = getDb();
    const products = db.collection("products");
    return products.find().toArray();
  }
  static findById(id: string) {
    const db = getDb();
    const product = db.collection("products");
    return product
      .find({
        _id: new ObjectId(id)
      })
      .next();
  }
  static deleteOne(id : string){
    const db = getDb();
    const product = db.collection("products");
    return product.deleteOne({
      _id: new ObjectId(id)
    })
  }
}
