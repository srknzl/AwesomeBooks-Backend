import * as fs from "fs";
import * as path from "path";
import { baseDirectory } from "../util/path";
import { ProductData } from "../interfaces/ProductData";
import { CartEntry } from "../interfaces/CartEntry";

const fileLocation = path.join(baseDirectory, "..", "data", "products.json");

export class Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;

  constructor(
    title: string,
    price: number,
    description: string,
    imageUrl: string
  ) {
    const arrayBuffer = new ArrayBuffer(8);
    const numberArray = new Float64Array(arrayBuffer);
    numberArray[0] = Math.random();
    const buffer = Buffer.from(arrayBuffer);

    this.id = buffer.toString("base64");
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  static getProductById(id: string, callback: Function) {
    Product.getProductsFromFile((data: Product[]) => {
      const productIndex = data.findIndex((prod: Product) => prod.id === id);
      if (productIndex === -1) {
        console.log("No such product");
        callback(null);
      } else {
        callback(data[productIndex]);
      }
    });
  }

  static getProductsFromFile = (cb: Function) => {
    fs.readFile(fileLocation, (err, data) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(data.toString()));
      }
    });
  };
  save() {
    Product.getProductsFromFile((products: Product[]) => {
      products.push(this);
      fs.writeFile(fileLocation, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb: Function) {
    Product.getProductsFromFile(cb);
  }
  static updateProduct(prodId: string, productData: ProductData,cb : Function) {
    Product.fetchAll((entries: CartEntry[]) => {
      const index = entries.findIndex(entry => entry.prod.id === prodId);
      if (index === -1) {
        console.log("Could not find product to update");
        return;
      } else {
        entries[index].prod.description = productData.description;
        entries[index].prod.price = productData.price;
        entries[index].prod.title = productData.title;
        entries[index].prod.imageUrl = productData.imageUrl;
        fs.writeFile(fileLocation, JSON.stringify(entries), err => {
          if (err) console.log(err);
        });
      }
      cb();
    });
  }
}
