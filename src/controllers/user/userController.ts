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
  
  // res.render("user/cart", {
  //   pageTitle: "Cart",
  //   active: "cart",
  //   entries: entries,
  //   price: price
  // });
};
export const addToCart: RequestHandler = (req, res, next) => {
  
  res.redirect("/user/cart");
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
