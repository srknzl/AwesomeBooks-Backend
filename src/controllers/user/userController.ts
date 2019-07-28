import { RequestHandler } from "express";

export const getProducts: RequestHandler = (req, res, next) => {
  res.render("user/products", {
    pageTitle: "Products",
    prods: null,
    active: "products"
  });
};
export const getShop: RequestHandler = (req, res, next) => {
  res.render("user/shop", {
    pageTitle: "Shop",
    prods: null,
    active: "shop"
  });
};
export const getOrders: RequestHandler = (req, res, next) => {
  res.render("user/orders", {
    pageTitle: "Orders",
    orders: null,
    active: "orders"
  });
};
export const getWelcome: RequestHandler = (req, res, next) => {
  res.render("user/welcome", {
    pageTitle: "Welcome",
    active: "welcome"
  });
 };
export const getProductDetail: RequestHandler = (req, res, next) => {
  res.render("user/view-product", {
    pageTitle: "Product Detail",
    active: "products",
    product: null
  });
  
};
export const getCart: RequestHandler = (req, res, next) => {
  res.render("user/cart", {
    pageTitle: "Cart",
    active: "cart",
    entries: null,
    price: null
  });
};

export const addToCart: RequestHandler = (req, res, next) => {};
export const removeFromCart: RequestHandler = (req, res, next) => {};
export const addOrder: RequestHandler = (req, res, next) => {};
export const removeAllFromCart: RequestHandler = (req, res, next) => {};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/user-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
