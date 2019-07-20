const fs = require("fs");
const path = require("path");

const baseDir = require("../util/path");

fileLocation = path.join(baseDir, "data", "products.json");

const getProductsFromFile = cb => {
  fs.readFile(fileLocation,(err, data)=>{
    if(err){
      cb([]);
    }else{
      cb(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(title,price,description,imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  
  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(fileLocation,JSON.stringify(products),err => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
