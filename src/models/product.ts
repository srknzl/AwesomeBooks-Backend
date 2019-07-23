import * as fs from "fs";
import * as path from "path";
import { baseDirectory } from "../util/path";
import { ProductData } from "../interfaces/ProductData";
import { Cart } from "./cart";

const fileLocation = path.join(baseDirectory, "..", "data", "products.json");

export class Product {
  id: string;
  title: string;
  price: string;
  description: string;
  imageUrl: string;

  constructor(
    title: string,
    price: string,
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
        console.error("No such product");
        callback(null);
      } else {
        callback(data[productIndex]);
      }
    });
  }
  static deleteProduct(id : string){
    Product.fetchAll((products:Product[])=>{
      const index = products.findIndex((product : Product)=> product.id === id);
      if(index === -1) return console.error("could not find that product to delete");
      products.splice(index,1);
      fs.writeFile(fileLocation,JSON.stringify(products),(err)=>{
        if(err)console.error(err);
        else{
          Cart.updateCartCount(id,0);
        }
      });
      
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
        console.error(err);
      });
    });
  }
  static fetchAll(cb: Function) {
    Product.getProductsFromFile(cb);
  }
  static updateProduct(prodId: string, productData: ProductData,cb : Function) {
    Product.fetchAll((prods: Product[]) => {
      
      const index = prods.findIndex(prod => prod.id === prodId);
      if (index === -1) {
        console.error("Could not find product to update");
        return;
      } else {
        prods[index].description = productData.description;
        prods[index].price = productData.price;
        prods[index].title = productData.title;
        prods[index].imageUrl = productData.imageUrl;
        fs.writeFile(fileLocation, JSON.stringify(prods), err => {
          if (err) console.error(err);
        });

        // Update products in the cart if same product changes.
        Cart.updateCartData(prodId,productData);

      }
      cb();
    });
  }
}
