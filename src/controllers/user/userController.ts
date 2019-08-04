import { RequestHandler } from "express";
import Product, { IProduct } from "../../models/product";
import Order from "../../models/order";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const prods = await Product.find();
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
    const prods = await Product.find();
    res.render("user/shop", {
      pageTitle: "Shop",
      prods: prods,
      active: "shop"
    });
  } catch (err) {
    throw err;
  }
};
export const getOrders: RequestHandler =  async (req, res, next) => {
  const orders = await Order.find().populate('items.product').exec();
  
  res.render("user/orders", {
    pageTitle: "Orders",
    orders: orders,
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
    const prod: IProduct | null = await Product.findById(
      req.params.id
    ).populate("user");
    if (prod) {
      res.render("user/view-product", {
        pageTitle: "Product Detail",
        active: "products",
        product: prod,
        creator: prod.user
      });
    } else {
      res.redirect("/user/not-found");
      throw "Product not found";
    }
  } catch (err) {
    throw err;
  }
};
export const getCart: RequestHandler = async (req, res, next) => {
  try {
    const user = await (req as any).user.populate('cart.items.product').execPopulate();

    if(user){
      let price = 0;
      user.cart.items.forEach((i : any) => {
        //@ts-ignore
        price += i.product.price * i.quantity;
      });
      res.render("user/cart", {
        pageTitle: "Cart",
        active: "cart",
        entries: user.cart.items,
        price: price
      });
    }else{
      res.redirect('/user/not-found');
      throw 'User not found';
    }
    
  } catch (err) {
    throw err;
  }
};

export const addToCart: RequestHandler = async (req, res, next) => {
  try {
    await (req as any).user.addToCart(req.body.id);
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
export const addOrder: RequestHandler = async (req, res, next) => {
  await (req as any).user.order();
  res.redirect('/user/orders');
};
export const removeAllFromCart: RequestHandler = async (req, res, next) => {
  try {
    await (req as any).user.removeAllFromCart(req.body.id);
    res.redirect('/user/cart');
  } catch (err) {
    throw err;
  }
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.status(404).render("errors/user-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
