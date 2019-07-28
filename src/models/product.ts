import { getDb } from "../util/database";

export class Product {
  title : string;
  price : number;
  description : string;
  imageUrl : string;

  constructor(title : string, price : number, description : string, imageUrl : string){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save(){
    const db = getDb();
    const products = db.collection('products');
    return products.insertOne(this);
  }
  static fetchAll(){
    const db = getDb();
    const products = db.collection('products');
    return products.find().toArray();
  }
} 