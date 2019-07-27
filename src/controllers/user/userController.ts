import { RequestHandler } from "express";
import { Product } from "../../models/product";
import { Cart } from "../../models/cart";

export const getProducts: RequestHandler = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render("user/products", {
      pageTitle: "Products",
      prods: products,
      active: "products"
    });
  })
  .catch((err)=>{
    console.error(err);
  });
};
export const getShop: RequestHandler = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render("user/shop", {
      pageTitle: "Shop",
      prods: products,
      active: "shop"
    });
  })
  .catch((err)=>{
    console.error(err);
  });
};
export const getWelcome: RequestHandler = (req, res, next) => {
  res.render("user/welcome", {
    pageTitle: "Welcome",
    active: "welcome"
  });
};
export const getProductDetail: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
  .then(
    (product)=>{
      if(product){
        res.render("user/view-product", {
          pageTitle: "Product Detail",
          active: "products",
          product: product
        });
      }else{
        res.redirect("/notfound");
      }
    }
  )
  .catch((err)=>{
    console.error(err);
  });
  
};
export const getCart: RequestHandler = (req, res, next) => {
  let productsG;

  req.user.getCarts()
  .then(
    carts => {
      return carts[0].getProducts();
    }
  )
  .then(
    (products) => {
      productsG = products;
      let price = 0;
      for (product in  productsG){
        price += product.price;
      }
      return price;
    }
  )
  .then(
    (price)=>{
      res.render("user/cart", {
        pageTitle: "Cart",
        active: "cart",
        entries: productsG,
        price: price
      });
    }
  )  
  .catch();
  
};
export const addToCart: RequestHandler = (req, res, next) => {
  req.user
    .getCarts()
    .then(carts => {
      return carts[0].addProduct({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
      });
    })
    .then(() => {
      res.redirect("/user/cart");
    })
    .catch(err => {
      console.error(err);
    });
};
export const removeFromCart: RequestHandler = (req, res, next) => {
  const id = req.body.id;

  res.redirect("/user/cart");
};
export const removeAllFromCart: RequestHandler = (req, res, next) => {
  const id = req.body.id;

  res.redirect("/user/cart");
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/user-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
