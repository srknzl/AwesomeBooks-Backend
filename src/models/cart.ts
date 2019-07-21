import fs from "fs";
import * as path from "path";
import { baseDirectory } from "../util/path";
import { Product } from "./product";

const fileLocation = path.join(baseDirectory, "..", "data", "cart.json");

export class Cart {

  static async getPrice(){
    let price = 0;
    await Cart.getProductsInCartFromFile((prods : Product[])=>{
      prods.forEach((prod)=>{
        price += prod.price;
      });
    });
    return price;
  }
  
  static addToCart(prod : Product){
    Cart.getProductsInCartFromFile((prods : Product[])=>{
      prods.push(prod);
      fs.writeFile(fileLocation,JSON.stringify(prods),(err)=>{
        if(err)console.log(err);
      })
    });
  }
  static removeFromCart(prodId : string){
    Cart.getProductsInCartFromFile((prods : Product[])=>{
      const index = prods.findIndex(prod => prod.id === prodId);
      prods.splice(index,1);
      fs.writeFile(fileLocation,JSON.stringify(prods),(err)=>{
        if(err)console.log(err);
      })
    });
  }
  static getProductsInCartFromFile(cb : Function){
    fs.readFile(fileLocation,(err,data)=>{
      if(err){
        cb([]);
      }else{
        cb(JSON.parse(data.toString()));
      }
    });
  }
  constructor() {

  }
}
