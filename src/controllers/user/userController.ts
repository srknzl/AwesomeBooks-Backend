import { Product } from "../../models/product";
import { RequestHandler } from "express";
import { Cart } from "../../models/cart";
import { CartEntry } from "../../interfaces/CartEntry";

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: Product[]) => {
    res.render("user/products", {
      pageTitle: "Products",
      prods: products,
      active: "products"
    });
  });
};
export const getShop: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: Product[]) => {
    res.render("user/shop", {
      pageTitle: "Shop",
      prods: products,
      active: "shop"
    });
  });
};
export const getWelcome: RequestHandler = (req, res, next) => {
  res.render("user/welcome", {
    pageTitle: "Welcome",
    active: "welcome"
  });
};
export const getCart: RequestHandler = (req, res, next) => {
  
  Cart.fetchAllProducts((products : Product[])=>{
    Cart.getPrice((price: number)=>{
      res.render("user/cart", {
        pageTitle: "Cart",
        active: "cart",
        prods: products,
        price: price
      });
    });
  });
  
};
export const addToCart: RequestHandler = (req, res, next) => {

  Product.getProductById(req.body.id,(prod: Product)=>{
    if(!prod)console.log('Product could not found when adding to cart');
    else Cart.addToCart(prod);
    res.redirect('/user/cart');
  });
  
  
};
export const removeFromCart: RequestHandler = (req, res, next) => {

  Cart.removeFromCart(req.body.id);
  
  res.redirect("/user/cart");
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render('errors/user-not-found',{
    pageTitle: 'Not found',
    active: ''
  });
};
