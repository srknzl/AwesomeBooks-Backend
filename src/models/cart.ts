import fs from "fs";
import * as path from "path";
import { baseDirectory } from "../util/path";
import { Product } from "./product";
import { CartEntry } from "../interfaces/CartEntry";

const fileLocation = path.join(baseDirectory, "..", "data", "cart.json");



export class Cart {

  static getPrice(cb: Function){
    let price = 0;
    Cart.fetchAllEntries((entries : CartEntry[])=>{
      entries.forEach((entry)=>{
        price += entry.prod.price;
      });
      cb(price);    
    });
  }
  
  static addToCart(prod : Product){
    Cart.fetchAllEntries((entries : CartEntry[])=>{
      const entryIndex = entries.findIndex((entry) => entry.prod.id = prod.id);
      if(entryIndex == -1){ // product did not exist
        const cartEntry : CartEntry = {
          prod: prod,
          qty: 1
        };
        entries.push(cartEntry);
        fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
          if(err)console.log(err);
        });
      }else{ // same product was added.
        entries[entryIndex].qty += 1;
        fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
          if(err)console.log(err);
        });
      }
    });
  }
  static removeFromCart(prodId : string){
    Cart.fetchAllEntries((entries : CartEntry[])=>{
      const entryIndex = entries.findIndex(entry => entry.prod.id === prodId);
      if(entryIndex === -1){
        console.log('Error, trying to remove a non existing cart');
        return;
      }else if(entries[entryIndex].qty > 1){
        entries[entryIndex].qty -= 1;
        fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
          if(err)console.log(err);
        });
      }else if(entries[entryIndex].qty === 1){
        entries.splice(entryIndex,1);
        fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
          if(err)console.log(err);
        });
      }
    });
  }
  static fetchAllEntries(cb : Function){
    fs.readFile(fileLocation,(err,data)=>{
      if(err){
        cb([]);
      }else{
        cb(JSON.parse(data.toString()));
      }
    });
  }
  static fetchAllProducts(cb : Function){
    fs.readFile(fileLocation,(err,data)=>{
      if(err){
        cb([]);
      }else{
        const prodArray : Product[] = [];
        const entriesArray : CartEntry[] = JSON.parse(data.toString());
        entriesArray.forEach((entry)=>{
          prodArray.push(entry.prod);
        });
        cb(prodArray);
      }
    });
  }
  constructor() {

  }
}
