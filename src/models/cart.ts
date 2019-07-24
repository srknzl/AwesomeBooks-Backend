import fs from "fs";
import * as path from "path";
import { baseDirectory } from "../util/path";
import { Product } from "./product";
import { CartEntry } from "../interfaces/CartEntry";
import { ProductData } from "../interfaces/ProductData";


const fileLocation = path.join(baseDirectory, "..", "data", "cart.json");



export class Cart {

  static getPrice(cb: Function){
    let price = 0;
    Cart.fetchAllEntries((entries : CartEntry[])=>{
      entries.forEach((entry)=>{
        price += Number.parseInt(entry.prod.price) * entry.qty;
      });
      cb(price);    
    });
  }
  
  static addToCart(prod : Product){
    Cart.fetchAllEntries((entries : CartEntry[])=>{
      const entryIndex = entries.findIndex((entry) => entry.prod.id === prod.id);
      if(entryIndex === -1){ // product did not exist
        const cartEntry : CartEntry = {
          prod: prod,
          qty: 1
        };
        entries.push(cartEntry);
        fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
          if(err)console.error(err);
        });
      }else{ // same product was added.
        entries[entryIndex].qty += 1;
        fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
          if(err)console.error(err);
        });
      }
    });
  }
  static removeFromCart(prodId : string){
    Cart.fetchAllEntries((entries : CartEntry[])=>{
      const entryIndex = entries.findIndex(entry => entry.prod.id === prodId);
      if(entryIndex === -1){
        console.error('Error, trying to remove a non existing cart');
        return;
      }else if(entries[entryIndex].qty > 1){
        entries[entryIndex].qty -= 1;
        fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
          if(err)console.error(err);
        });
      }else if(entries[entryIndex].qty === 1){
        entries.splice(entryIndex,1);
        fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
          if(err)console.error(err);
        });
      }
    });
  }
  static removeAllFromCart(prodId : string){
    Cart.fetchAllEntries((entries : CartEntry[])=>{
      const entryIndex = entries.findIndex(entry => entry.prod.id === prodId);
      if(entryIndex === -1){
        console.error('Error, trying to remove a non existing cart');
        return;
      }
      entries.splice(entryIndex,1);
      fs.writeFile(fileLocation,JSON.stringify(entries),err=>{
        if(err)console.error(err);
      })
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
  static updateCartCount(prodId : string,count : number){
    Cart.fetchAllEntries((entries: CartEntry[])=>{
      const index = entries.findIndex((entry:CartEntry)=>entry.prod.id === prodId);
      if(index === -1){
        console.error("No product was found in the cart to update");
        return;
      }else{
        if(count < -1){
          return console.error("Updating cart, count cannot be less than 0.");
        }else if(count === 0){
          return Cart.removeAllFromCart(prodId);
        }else {
          entries[index].qty = count;
          fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
            if(err)console.error(err);
          });
        }

      }
    });

  }
  static updateCartData(prodId:string, productData : ProductData){
    Cart.fetchAllEntries((entries: CartEntry[])=>{
      const index = entries.findIndex((entry: CartEntry)=> entry.prod.id === prodId);
      if(index === -1)return console.error("Could not found the product to update in the cart.");
      entries[index].prod.description = productData.description;
      entries[index].prod.imageUrl = productData.imageUrl;
      entries[index].prod.price = productData.price;
      entries[index].prod.title = productData.title;
      fs.writeFile(fileLocation,JSON.stringify(entries),(err)=>{
        if(err) console.error(err);
      });
    });
  }
}
