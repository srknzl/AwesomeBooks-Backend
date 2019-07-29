import { RequestHandler } from "express";
import { Product, ProductInterface } from "../../models/product";
import { User, UserInterface, CartInterface } from "../../models/user";
import { ObjectId } from "mongodb";

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
      (prod: ProductInterface) => {
        fetchedProduct = prod;
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
    .catch((err: Error) => {
      throw err;
    })
};
export const getCart: RequestHandler = (req, res, next) => {

  (req as any).user.getCart()
  .then(
    (products : Array<any>) => {
      let price = 0;
      products.forEach(p=>{
        price += p.price * p.quantity;
      })
      res.render("user/cart", {
        pageTitle: "Cart",
        active: "cart",
        entries: products,
        price: price
      });
    }
  )
  .catch((err : Error) => {
    throw err;
  });

 
};

export const addToCart: RequestHandler = (req, res, next) => {

  (req as any).user.addToCart(new ObjectId(req.body.id)).then(
    (result : any)=>{
      res.redirect("/user/cart");
    }
  ).catch(
    (err : Error)  =>{
      throw err;
    }
  );
};
export const removeFromCart: RequestHandler = (req, res, next) => { 
  (req as any).user.removeOneFromCart(req.body.id)
  .then(
    ()=>{
      res.redirect('/user/cart');
    }
  )
  .catch(
    (err : Error) => {
      throw err;
    }
  );
};
export const addOrder: RequestHandler = (req, res, next) => { };
export const removeAllFromCart: RequestHandler = (req, res, next) => {
  (req as any).user.removeAllFromCart(req.body.id)
  .then(
    ()=>{
      res.redirect('/user/cart');
    }
  )
  .catch(
    (err : Error) => {
      throw err;
    }
  );
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/user-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
