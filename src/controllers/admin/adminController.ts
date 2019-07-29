import { RequestHandler } from "express";
import { Product, ProductInterface } from "../../models/product";
import { User } from "../../models/user";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("admin/products", {
      pageTitle: "Products",
      active: "admin-products",
      prods: products
    });
  } catch (err) {
    throw err;
  }
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
export const postAddProduct: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl, (req as any).user._id);
  try {
    await product.save();
    res.redirect('/admin/products');
  } catch (err) {
    throw err;
  }
};
export const getEditProduct: RequestHandler = async (req, res, next) => {
  try {
    const prod = await Product.findById(req.params.id);
    res.render("admin/edit-product", {
      active: "edit-product",
      product: prod
    });
  } catch (err) {
    throw err;
  }
};
export const getProductDetail: RequestHandler = async (req, res, next) => {
  try {
    const prod: ProductInterface = await Product.findById(req.params.id);
    const user = await User.findById(prod.userId);
    res.render("admin/view-product", {
      active: "edit-product",
      product: prod,
      creator: user
    });
  } catch (err) {
    throw err;
  }
};
export const postEditProduct: RequestHandler = async (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const product = new Product(title, price, description, imageUrl, (req as any).user._id, id);
  try {
    await product.save();
    res.redirect('/admin/products');
  } catch (err) {
    throw err;
  }
};
export const postDeleteProduct: RequestHandler = async (req, res, next) => {
  const id = req.body.id;
  try {
    await Product.deleteOne(id);
    res.redirect('/admin/products');
  } catch (err) {
    throw err;
  }
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/admin-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
