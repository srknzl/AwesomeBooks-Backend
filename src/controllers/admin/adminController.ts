import { RequestHandler } from "express";

export const getProducts: RequestHandler = (req, res, next) => {
  res.render("admin/products", {
    pageTitle: "Products",
    active: "admin-products",
    prods: null
  }); 
};

export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    active: "admin-add-product"
  });
};
export const getWelcome: RequestHandler = (req, res, next) => {
  res.render("admin/welcome", {
    pageTitle: "Admin login successful",
    active: "welcome"
  });
};
export const postAddProduct: RequestHandler = (req, res, next) => {
  
  
};
export const getEditProduct: RequestHandler = (req, res, next) => {
  res.render("admin/edit-product", {
    active: "edit-product",
    product: null
  });
};
export const getProductDetail: RequestHandler = (req, res, next) => {
  res.render("admin/view-product", {
    active: "edit-product",
    product: null
  });
};
export const postEditProduct: RequestHandler = (req, res, next) => {
  
};
export const postDeleteProduct: RequestHandler = (req, res, next) => {
  
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/admin-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
