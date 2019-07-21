import { Product } from "../../models/product";
import { RequestHandler } from "express";

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
  res.render("user/cart", {
    pageTitle: "Cart",
    active: "cart"
  });
};
export const addToCart: RequestHandler = (req, res, next) => {
  console.log("Adding a product to cart with id:", req.body.id);
  res.render("user/cart", {
    pageTitle: "Cart",
    active: "cart"
  });
};
