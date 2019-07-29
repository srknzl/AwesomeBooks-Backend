import { RequestHandler } from "express";
import { Product } from "../../models/product";
import { User } from "../../models/user";

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll().then(
    (prods) => {
      res.render("user/products", {
        pageTitle: "Products",
        prods: prods,
        active: "products"
      });
    }
  ).catch(
    err => {
      throw err;
    }
  );
};
export const getShop: RequestHandler = (req, res, next) => {
  Product.fetchAll().then(
    (prods) => {
      res.render("user/shop", {
        pageTitle: "Shop",
        prods: prods,
        active: "shop"
      });
    }
  ).catch(
    err => {
      throw err;
    }
  );


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
  let fetchedProduct: any;

  Product.findById(req.params.id)
    .then(
      (prod: Product) => {
        fetchedProduct = prod;
        console.log(fetchedProduct);
        return User.findById(prod.userId);
      }
    )
    .then(
      user => {
        res.render("user/view-product", {
          pageTitle: "Product Detail",
          active: "products",
          product: fetchedProduct,
          creator: user
        });
      }
    )
    .catch(err => {
      throw err;
    })
};
export const getCart: RequestHandler = (req, res, next) => {
  res.render("user/cart", {
    pageTitle: "Cart",
    active: "cart",
    entries: null,
    price: null
  });
};

export const addToCart: RequestHandler = (req, res, next) => { };
export const removeFromCart: RequestHandler = (req, res, next) => { };
export const addOrder: RequestHandler = (req, res, next) => { };
export const removeAllFromCart: RequestHandler = (req, res, next) => { };
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/user-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
