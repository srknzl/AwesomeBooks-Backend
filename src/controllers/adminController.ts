import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import aws from "aws-sdk";

import Product, { IProduct } from "../models/product";
import takeFive from "../util/pagination";

const PRODUCTS_PER_PAGE = 6;

let s3 : undefined | aws.S3 = undefined;
if(aws && aws.config && aws.config.credentials){
  s3 = new aws.S3({
    accessKeyId: aws.config.credentials.accessKeyId,
    secretAccessKey: aws.config.credentials.secretAccessKey,
    region: 'eu-central-1'
  })
}


export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    const count = await Product.find().countDocuments();
    const numberOfPages = Math.ceil(1.0 * count / PRODUCTS_PER_PAGE);
    const products = await Product.find({
      user: (req as any).session.admin._id
    }).limit(PRODUCTS_PER_PAGE).skip((page - 1) * PRODUCTS_PER_PAGE);

    const pages: number[] = []
    takeFive(numberOfPages, page, pages);
    pages.sort();


    res.render("admin/products", {
      pageTitle: "Products",
      active: "admin-products",
      prods: products,
      pages: pages,
      currentPage: page,
      lastPage: numberOfPages
    });
  } catch (err) {
    next(new Error(err));
  }
};

export const getAddProduct: RequestHandler = (req, res, next) => {

  res.render("admin/add-product", {
    pageTitle: "Add Product",
    active: "admin-add-product",
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
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;

  if (!req.session) {
    req.flash('error', 'Please login!');
    return res.redirect("/");
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if(s3){
      try {
        //@ts-ignore
        await s3.deleteObject( {  Bucket: 'awesomebooks', Key: req.file.key });
      } catch (error) {
        next(error);
      }
    }
    return res.status(422).render("admin/add-product", {
      pageTitle: "Add Product",
      active: "admin-add-product",
      errors: [],
      successes: [],
      validationMessages: errors.array(),
      autoFill: {
        title: title,
        price: price,
        description: description
      }
    });
  }

  let product;
  
  if (!image) {
    product = new Product({
      title: title,
      price: price,
      description: description,
      user: req.session.admin._id
    });
  } else {
    product = new Product({
      title: title,
      price: price,
      //@ts-ignore
      imageUrl: "/" + req.file.key,
      description: description,
      user: req.session.admin._id
    });
  }


  try {
    await product.save();
    res.redirect("/admin/products");
  } catch (err) {
    next(new Error(err));
  }
};
export const getEditProduct: RequestHandler = async (req, res, next) => {
  try {
    const prod: IProduct | null = await Product.findOne({
      _id: req.params.id,
      user: (req as any).session.admin._id
    });
    if (prod) {
      res.render("admin/edit-product", {
        active: "edit-product",
        product: prod,
        validationMessages: [],
        autoFill: {}
      });
    } else {
      req.flash("error", "Product not found!");
      return res.redirect("/admin/products");
    }
  } catch (err) {
    next(new Error(err));
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
    next(new Error(err));
  }
};
export const postEditProduct: RequestHandler = async (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const image = req.file;
  const deleteImage = req.body.deleteImage;

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
        price: price,
        description: description,
        imageUrl: "/" + image.destination + "/" + image.filename
      },
      productId: id
    });
  }
  try {
    if (image) {
      if (deleteImage) {
        req.flash("error", "If you only want to delete the existing image and not update it, do not select any new image.");
        return res.redirect("/admin/edit-product/" + id);
      }
      const prod = await Product.findById(id);
      if (prod && prod.imageUrl) {
        if (s3) {
          try {
            //@ts-ignore
            await s3.deleteObject( {  Bucket: 'awesomebooks', Key: req.file.key });
          } catch (error) {
            next(error);
          }
        }
        //@ts-ignore
        prod.imageUrl = '/' + req.file.key;
        await prod.save();
      }
      return res.redirect("/admin/products");

    } else {
      if (deleteImage) {
        const prod = await Product.findById(id);

        if (prod) {
          if (prod.imageUrl && s3) {
            try {
              //@ts-ignore
              await s3.deleteObject( {  Bucket: 'awesomebooks', Key: prod.imageUrl.substring(1) });
            } catch (error) {
              next(error);
            }
          }
          prod.imageUrl = undefined;
          await prod.save();
        }
      } else {
        await Product.findByIdAndUpdate(id, {
          title: title,
          price: price,
          description: description,
        });
      }

      return res.redirect("/admin/products");

    }
  } catch (err) {
    next(new Error(err));
  }
};
export const deleteProduct: RequestHandler = async (req, res, next) => {
  const id = req.params.prodId;
  try {
    const prod = await Product.findOne({
      _id: id,
      user: (req as any).session.admin._id
    });

    if(prod)
      console.log(prod,prod.imageUrl,s3);
  
    //@ts-ignore
    if (prod && prod.imageUrl && s3) {
      try {
        //@ts-ignore
        await s3.deleteObject( {  Bucket: 'awesomebooks', Key: prod.imageUrl.substring(1) }).promise();
      } catch (error) {
        next(error);
      }
    }
    
    const result = await Product.deleteOne({
      _id: id,
      user: (req as any).session.admin._id
    });
    if (result.n) {
      return res.status(200).json({
        message: "Product deleted"
      });
    } else {
      return res.status(404).json({
        err: "No such product found to be deleted",
        message: "Product not found"
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      err: err,
      message: "Product could not be deleted due to a server error"
    });
  }
};
