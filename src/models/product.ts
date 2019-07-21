import * as fs from "fs";
import * as path from "path";
import { baseDirectory } from "../util/path";

const fileLocation = path.join(baseDirectory, "data", "products.json");

const getProductsFromFile = (cb: Function) => {
  fs.readFile(fileLocation,(err, data)=>{
    if(err){
      cb([]);
    }else{
      cb(JSON.parse(data.toString()));
    }
  });
};

export class Product {
  
  id : string;
  title: string;
  price : number;
  description : string;
  imageUrl: string;

  constructor(title : string,price :number,description: string,imageUrl:string) {
    const arrayBuffer = new ArrayBuffer(8);
    const numberArray = new Float64Array(arrayBuffer);
    numberArray[0] = Math.random();
    const buffer = Buffer.from(arrayBuffer);

    this.id = buffer.toString('base64');
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    getProductsFromFile((products : Product[]) => {
      products.push(this);
      fs.writeFile(fileLocation,JSON.stringify(products),err => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb : Function) {
    getProductsFromFile(cb);
  }
};
