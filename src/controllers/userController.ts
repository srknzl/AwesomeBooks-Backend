import { RequestHandler } from "express";
import Product, { IProduct } from "../models/product";
import Order from "../models/order";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";
    const errors = req.flash('error');
    const successes = req.flash('success');

    const prods = await Product.find();
    res.render("user/products", {
      pageTitle: "Products",
      prods: prods,
      active: "products",
      errors : errors,
      successes: successes
    });
  } catch (err) {
    next(new Error(err));
  }
};
export const getShop: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";

    const prods = await Product.find();
    res.render("user/shop", {
      pageTitle: "Shop",
      prods: prods,
      active: "shop"
    });
  } catch (err) {
    next(new Error(err));
  }
};
export const getOrders: RequestHandler = async (req, res, next) => {
  try {
    let orders = await Order.find()
      .populate("items.product")
      .exec();

    await orders.forEach(async order => {
      order.items = order.items.filter(i => i.product);
      if (order.items.length === 0) {
        await Order.deleteOne({ _id: order._id });
      }
    });

    orders = await Order.find()
      .populate("items.product")
      .exec();
      
    res.render("user/orders", {
      pageTitle: "Orders",
      orders: orders,
      active: "orders"
    });
  } catch (err) {
    next(new Error(err));
  }
};
export const getWelcome: RequestHandler = (req, res, next) => {
  const errors = req.flash('error');
  const successes = req.flash('success');

  res.render("user/welcome", {
    pageTitle: "Welcome",
    active: "welcome",
    errors: errors,
    successes: successes
  });
};
export const getProductDetail: RequestHandler = async (req, res, next) => {
  try {
    const prod: IProduct | null = await Product.findById(
      req.params.id
    ).populate("user");
    if (!req.session) throw "No session";

    if (prod) {
      res.render("user/view-product", {
        pageTitle: "Product Detail",
        active: "products",
        product: prod,
        creator: prod.user
      });
    } else {
      req.flash('error','Product not found!');
      return res.redirect("/user/products");
    }
  } catch (err) {
    next(new Error(err));
  }
};
export const getCart: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";

    const user = await req.session.user
      .populate("cart.items.product")
      .execPopulate();

    if (user) {
      let price = 0;
      user.cart.items.forEach((i: any) => {
        //@ts-ignore
        price += i.product.price * i.quantity;
      });
      res.render("user/cart", {
        pageTitle: "Cart",
        active: "cart",
        entries: user.cart.items,
        price: price
      });
    } else {
      req.flash('error','User not found!');
      return res.redirect("/user/welcome");
    }
  } catch (err) {
    next(new Error(err));
  }
};

export const addToCart: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";

    await req.session.user.addToCart(req.body.id);
    res.redirect("/user/cart");
  } catch (err) {
    next(new Error(err));
  }
};
export const removeFromCart: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";

    await req.session.user.removeOneFromCart(req.body.id);
    res.redirect("/user/cart");
  } catch (err) {
    next(new Error(err));
  }
};
export const addOrder: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";

    await req.session.user.order();
    res.redirect("/user/orders");
  } catch (err) {
    next(new Error(err));
  }
};
export const removeAllFromCart: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";

    await req.session.user.removeAllFromCart(req.body.id);
    res.redirect("/user/cart");
  } catch (err) {
    next(new Error(err));
  }
};
