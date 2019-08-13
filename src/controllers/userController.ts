import { RequestHandler } from "express";
import PDFDocument from "pdfkit";
import fs from "fs";

import Product, { IProduct } from "../models/product";
import Order from "../models/order";
import takeFive from "../util/pagination";

const PRODUCTS_PER_PAGE = 6;

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";
    const page = +req.query.page || 1;
    const count = await Product.find().countDocuments();
    const numberOfPages = Math.ceil(1.0 * count/PRODUCTS_PER_PAGE);
    const prods = await Product.find().skip((page-1)*PRODUCTS_PER_PAGE).limit(PRODUCTS_PER_PAGE);
    
    
    const pages : number[] = []
    takeFive(numberOfPages,page,pages);
    pages.sort();


    res.render("user/products", {
      pageTitle: "Products",
      prods: prods,
      active: "products",
      pages: pages,
      currentPage: page,
      lastPage: numberOfPages
    });
  } catch (err) {
    next(new Error(err));
  }
};
export const getShop: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";

    const page = +req.query.page || 1;
    const count = await Product.find().countDocuments();
    const numberOfPages = Math.ceil(1.0 * count/PRODUCTS_PER_PAGE);
    const prods = await Product.find().skip((page-1)*PRODUCTS_PER_PAGE).limit(PRODUCTS_PER_PAGE);

    const pages : number[] = []
    
    takeFive(numberOfPages,page,pages);
    pages.sort();

    res.render("user/shop", {
      pageTitle: "Shop",
      prods: prods,
      active: "shop",
      pages: pages,
      currentPage: page,
      lastPage: numberOfPages
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
    if (!req.session) throw "No session";

    if (prod) {
      res.render("user/view-product", {
        pageTitle: "Product Detail",
        active: "products",
        product: prod,
        creator: prod.user
      });
    } else {
      req.flash("error", "Product not found!");
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
      req.flash("error", "User not found!");
      return res.redirect("/user/welcome");
    }
  } catch (err) {
    next(new Error(err));
  }
};
export const getInvoice: RequestHandler = async (req, res, next) => {
  const orderId = req.params.orderId;
  const pdfDoc = new PDFDocument();

  const fileStream = fs.createWriteStream("data/invoices/" + orderId + ".pdf");

  const order = await Order.findById(orderId)
    .populate("user")
    .populate("items.product")
    .exec();

  if (!order) {
    req.flash("error", "Order not found. An invoice can't be generated!");
    return res.redirect("/user/orders");
  }

  pdfDoc.pipe(fileStream);
  pdfDoc.pipe(res);

  pdfDoc.registerFont("regular", "assets/fonts/PalanquinDark-Regular.ttf");
  pdfDoc.registerFont("bold", "assets/fonts/PalanquinDark-Bold.ttf");

  pdfDoc
  .fontSize(13)
  .font("bold")
  .text("Order Date: ", {
    continued: true
  })
  .font("regular")
  .text(order.orderDate.toLocaleString("en-US"));
  
  pdfDoc.moveDown(1);

  pdfDoc
    .fontSize(20)
    .font("bold")
    .text("Invoice", {
      underline: true,
      align: "center"
    });
  pdfDoc.fontSize(13);

  pdfDoc.font("regular").text("Dear " + (order as any).user.name + ", here is your invoice.");
  
  pdfDoc
      .font("bold")
      .text("Order Id : ", {
        continued: true
      })
      .font("regular")
      .text(order._id.toString());

  pdfDoc.moveDown(1);

  let counter = 0;
  let priceCounter = 0;
  order.items.forEach(order => {
    counter++;
    priceCounter += (order as any).product.price * order.quantity;
    pdfDoc
      .image((order as any).product.imageUrl.substring(1), {
        height: 100
      });

    pdfDoc
      .font("bold")
      .text("Product " + counter.toString() + " : ", {
        continued: true
      })
      .font("regular")
      .text((order as any).product.title + " x" + (order as any).quantity);

    pdfDoc
      .font("bold")
      .text("Description : ", {
        continued: true
      })
      .font("regular")
      .text((order as any).product.description);

    pdfDoc
      .font("bold")
      .text("Price : ", {
        continued: true
      })
      .font("regular")
      .text((order as any).product.price + "$");
    pdfDoc.moveDown(1);
  });
 

  pdfDoc
    .font("bold")
    .text("Address: ", {
      continued: true
    })
    .font("regular")
    .text(order.address);
  pdfDoc.moveDown(2);
  pdfDoc
    .font("bold")
    .text("Total : ", {
      continued: true
    })
    .font("regular")
    .text(priceCounter.toString() + "$");

  pdfDoc.end();
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
