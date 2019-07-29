import { RequestHandler } from "express";
import { Product, ProductInterface } from "../../models/product";
import { User } from "../../models/user";

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

  const product = new Product(title,price,description,imageUrl,(req as any).user._id);

  //@ts-ignore
  product.save()
  .then(
    (result:any) => {
      res.redirect('/admin/products');
    }
  )
  .catch((err: Error) => {
    throw err;
  });

};
export const getEditProduct: RequestHandler = (req, res, next) => {

  Product.findById(req.params.id)
  .then(
    prod => {
      res.render("admin/edit-product", {
        active: "edit-product",
        product: prod
      });
    }
  )
  .catch(
    err => {
      throw err;
    }
  );
  
};
export const getProductDetail: RequestHandler = (req, res, next) => {

  let fetchedProd : any;

  Product.findById(req.params.id)
  .then(
    (prod : ProductInterface) => {
      fetchedProd = prod;
      return User.findById(prod.userId);
    }
  )
  .then(
    user => {
      res.render("admin/view-product", {
        active: "edit-product",
        product: fetchedProd,
        creator: user
      });
    }
  )
  .catch(
    err => {
      throw err;
    }
  );

};
export const postEditProduct: RequestHandler = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product(title,price,description,imageUrl,id);

  product.save()
  .then(
    (result : any) => {
      res.redirect('/admin/products');
    }
  )
  .catch(
    (err : Error) => {
      throw err;
    }
  );
};
export const postDeleteProduct: RequestHandler = (req, res, next) => {
  const id = req.body.id;

  Product.deleteOne(id)
  .then(
    ()=>{
      res.redirect('/admin/products');
    }
  ).catch(
    err => {
      throw err;
    }
  )
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/admin-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
