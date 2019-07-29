import { RequestHandler } from "express";
import { Product, ProductInterface } from "../../models/product";
import { User } from "../../models/user";
import { ObjectId } from "mongodb";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const prods = await Product.fetchAll();
    res.render("user/products", {
      pageTitle: "Products",
      prods: prods,
      active: "products"
    });
  } catch (err) {
    throw err;
  }
};
export const getShop: RequestHandler = async (req, res, next) => {
  try {
    const prods = await Product.fetchAll();
    res.render("user/shop", {
      pageTitle: "Shop",
      prods: prods,
      active: "shop"
    });
  } catch (err) {
    throw err;
  }
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
export const getProductDetail: RequestHandler = async (req, res, next) => {
  try {
    const prod: ProductInterface = await Product.findById(req.params.id);
    const user = await User.findById(prod.userId);
    res.render("user/view-product", {
      pageTitle: "Product Detail",
      active: "products",
      product: prod,
      creator: user
    });
  } catch (err) {
    throw err;
  }
};
export const getCart: RequestHandler = async (req, res, next) => {
  try {
    const products: Array<any> = await (req as any).user.getCart();
    let price = 0;
    products.forEach(p => {
      price += p.price * p.quantity;
    })
    res.render("user/cart", {
      pageTitle: "Cart",
      active: "cart",
      entries: products,
      price: price
    });
  } catch (err) {
    throw err;
  }
};

export const addToCart: RequestHandler = async (req, res, next) => {
  try {
    await (req as any).user.addToCart(new ObjectId(req.body.id));
    res.redirect("/user/cart");
  } catch (err) {
    throw err;
  }
};
export const removeFromCart: RequestHandler = async (req, res, next) => {
  try {
    await (req as any).user.removeOneFromCart(req.body.id);
    res.redirect('/user/cart');
  } catch (err) {
    throw err;
  }
};
export const addOrder: RequestHandler = (req, res, next) => { };
export const removeAllFromCart: RequestHandler = async (req, res, next) => {
  try {
    await (req as any).user.removeAllFromCart(req.body.id);
    res.redirect('/user/cart');
  } catch (err) {
    throw err;
  }
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/user-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
