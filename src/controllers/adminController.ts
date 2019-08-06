import { RequestHandler } from "express";
import Product, { IProduct } from "../models/product";
import { validationResult } from "express-validator";
// import { User } from "../../models/user";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await Product.find({
      user: (req as any).session.admin._id
    });
    const errors = req.flash("error");
    const successes = req.flash("success");

    res.render("admin/products", {
      pageTitle: "Products",
      active: "admin-products",
      prods: products,
      errors: errors,
      successes: successes
    });
  } catch (err) {
    req.flash("error", "Something went wrong!");
    return res.redirect("/admin/products");
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

  if (!req.session){
    req.flash('error','Please login!');
    return res.redirect("/");
  }

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
    req.flash('error','Something went wrong');
    return res.redirect("/admin/products");
  }
};
export const getEditProduct: RequestHandler = async (req, res, next) => {
  try {
    const errors = req.flash("error");
    const successes = req.flash("success");

    const prod: IProduct | null = await Product.findOne({
      _id: req.params.id,
      user: (req as any).session.admin._id
    });
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
      req.flash("error", "Product not found!");
      return res.redirect("/admin/products");
    }
  } catch (err) {
    req.flash("error", "Something is not right!");
    return res.redirect("/admin/products");
  }
};
export const getProductDetail: RequestHandler = async (req, res, next) => {
  try {
    const prod: IProduct | null = await Product.findOne({
      _id: req.params.id,
      user: (req as any).session.admin._id
    }).populate("user");
    if (prod) {
      res.render("admin/view-product", {
        active: "edit-product",
        product: prod,
        creator: prod.user
      });
    } else {
      req.flash("error", "Product not found");
      return res.redirect("/admin/products");
    }
  } catch (err) {
    req.flash("error", "Something went wrong");
    return res.redirect("/admin/products");
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
    return res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
    return res.redirect("/admin/welcome");
  }
};
export const postDeleteProduct: RequestHandler = async (req, res, next) => {
  const id = req.body.id;
  try {
    const result = await Product.deleteOne({
      _id: id,
      user: (req as any).session.admin._id
    });
    if (result.n) {
      req.flash("success", "Product deleted.");
      return res.redirect("/admin/products");
    } else {
      req.flash("error", "Could not delete the product!");
      return res.redirect("/admin/products");
    }
  } catch (err) {
    req.flash("error", "Something went wrong");
    return res.redirect("/admin/products");
  }
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.status(404).render("errors/admin-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
