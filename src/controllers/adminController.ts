import { RequestHandler } from "express";
import Product, { IProduct } from "../models/product";
import { validationResult } from "express-validator";
// import { User } from "../../models/user";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await Product.find();
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
  const errors = req.flash("error");
  const successes = req.flash("success");

  res.render("admin/add-product", {
    pageTitle: "Add Product",
    active: "admin-add-product",
    errors: errors,
    successes: successes,
    validationMessages: [],
    autoFill: {}
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

  if (!req.session) throw "No session";

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/add-product", {
      pageTitle: "Add Product",
      active: "admin-add-product",
      errors: [],
      successes: [],
      validationMessages: errors.array(),
      autoFill: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
      }
    });
  }

  const product = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    user: req.session.admin._id
  });

  try {
    await product.save();
    res.redirect("/admin/products");
  } catch (err) {
    throw err;
  }
};
export const getEditProduct: RequestHandler = async (req, res, next) => {
  try {
    const errors = req.flash("error");
    const successes = req.flash("success");

    const prod: IProduct | null = await Product.findById(req.params.id);
    if (prod) {
      res.render("admin/edit-product", {
        active: "edit-product",
        product: prod,
        errors: errors,
        successes: successes,
        validationMessages: [],
        autoFill: {}
      });
    } else {
      throw "Product not found";
    }
  } catch (err) {
    throw err;
  }
};
export const getProductDetail: RequestHandler = async (req, res, next) => {
  try {
    const prod: IProduct | null = await Product.findById(
      req.params.id
    ).populate("user");
    if (prod) {
      res.render("admin/view-product", {
        active: "edit-product",
        product: prod,
        creator: prod.user
      });
    } else {
      res.redirect("/admin/not-found");
      throw "Product not found";
    }
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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      active: "admin-edit-product",
      errors: [],
      successes: [],
      validationMessages: errors.array(),
      autoFill: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
      },
      productId: id
    });
  }

  try {
    await Product.findByIdAndUpdate(id, {
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl
    });
    res.redirect("/admin/products");
  } catch (err) {
    throw err;
  }
};
export const postDeleteProduct: RequestHandler = async (req, res, next) => {
  const id = req.body.id;
  try {
    await Product.deleteOne({ _id: id });
    res.redirect("/admin/products");
  } catch (err) {
    throw err;
  }
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.status(404).render("errors/admin-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};