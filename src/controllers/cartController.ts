import { RequestHandler, Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import User from "../models/user";

export const getCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
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
    next(err);
  }
};
export const addToCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log("User ",(req as any).userId," adds product", req.body.id, " to the cart");
  try {
    const user: any = await User.findById((req as any).userId);
    await user.addToCart(new ObjectId(req.body.id));
    res.status(200).json({ message: "Successfully added to the cart!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const removeFromCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) throw "No session";

    await req.session.user.removeOneFromCart(req.body.id);
    res.redirect("/user/cart");
  } catch (err) {
    next(err);
  }
};
export const removeAllFromCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) throw "No session";

    await req.session.user.removeAllFromCart(req.body.id);
    res.redirect("/user/cart");
  } catch (err) {
    next(err);
  }
};
