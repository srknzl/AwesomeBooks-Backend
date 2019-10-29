import { RequestHandler } from "express";
import PDFDocument from "pdfkit";
import fs from "fs";

import Order from "../models/order";

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
export const getInvoice: RequestHandler = async (req, res, next) => {
  const orderId = req.params.orderId;
  const pdfDoc = new PDFDocument();

  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }
  if (!fs.existsSync("data/invoices")) {
    fs.mkdirSync("data/invoices");
  }
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


  res.setHeader("Content-Type", "application/pdf")
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
  order.items.forEach(async order => {
    counter++;
    priceCounter += (order as any).product.price * order.quantity;

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
export const addOrder: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw "No session";

    await req.session.user.order();
    res.redirect("/user/orders");
  } catch (err) {
    next(new Error(err));
  }
};