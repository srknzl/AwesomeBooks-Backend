import { RequestHandler } from "express";
import { Product } from "../../models/product";

export const getProducts: RequestHandler = (req, res, next) => {

  Product.fetchAll().
  then(
    products => {
      res.render("admin/products", {
        pageTitle: "Products",
        active: "admin-products",
        prods: products
      });
    }
  ).catch(
    err => {
      throw err;
    }
  );
  
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
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title,price,description,imageUrl);

  product.save()
  .then(
    result => {
      res.redirect('/admin/products');
    }
  )
  .catch(err => {
    throw err;
  });

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
export const postEditProduct: RequestHandler = (req, res, next) => {};
export const postDeleteProduct: RequestHandler = (req, res, next) => {};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/admin-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
