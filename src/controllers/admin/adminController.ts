import { Product } from "../../models/product";
import { RequestHandler } from "express";
import { Cart } from "../../models/cart";

export const getProducts: RequestHandler = (req, res, next) => {
  
  Product.findAll()
    .then(products => {
      res.render("admin/products", {
        pageTitle: "Products",
        active: "admin-products",
        prods: products
      });
    })
    .catch(err => {
      console.error(err);
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
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
  .then(()=>{
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.error(err);
  });
  
};
export const getEditProduct: RequestHandler = (req, res, next) => {
  const prodId = req.params.id;
  Product.findByPk(prodId)
    .then(product => {
      if (product) {
        res.render("admin/edit-product", {
          active: "edit-product",
          product: product
        });
      } else {
        console.error("No product found with this id: ", prodId);
        res.redirect("/user/notfound");
      }
    })
    .catch(err => {
      console.error(err);
    });
};
export const getProductDetail: RequestHandler = (req, res, next) => {
  const prodId = req.params.id;
  Product.findByPk(prodId)
    .then(product => {
      if (product) {
        res.render("admin/view-product", {
          active: "edit-product",
          product: product
        });
      } else {
        console.error("No product found with this id: ", prodId);
        res.redirect("/admin/notfound");
      }
    })
    .catch(err => {
      console.error(err);
    });
};
export const postEditProduct: RequestHandler = (req, res, next) => {
  const prodId = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(prodId)
    .then(product => {
      if (product) {
        return product;
      } else {
        console.error("No product found with this id: ", prodId);
        res.redirect("/admin/notfound");
      }
    })
    .then(product => {
      if (product) {
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
        product.title = title;
        product.save();
        res.redirect("/admin/products");
      } else {
        console.error("Product undefined when trying to save!");
        res.redirect("/admin/notfound");
      }
    })
    .catch(err => {
      console.error(err);
    });
};
export const postDeleteProduct: RequestHandler = (req, res, next) => {
  const id = req.body.id;
  Product.findByPk(id)
    .then(product => {
      if (product) {
        return product.destroy();
      }
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.error(err);
    });
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/admin-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
