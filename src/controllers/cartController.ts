import { RequestHandler, Request, Response, NextFunction } from "express";

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
    next(new Error(err));
  }
};
export const addToCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) throw "No session";
    console.log("Add cart", req.body.id);
    await req.session.user.addToCart(req.body.id);
    
    res.redirect("/cart");
  } catch (err) {
    next(new Error(err));
  }
};
export const removeFromCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) throw "No session";

    await req.session.user.removeOneFromCart(req.body.id);
    res.redirect("/user/cart");
  } catch (err) {
    next(new Error(err));
  }
};
export const removeAllFromCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) throw "No session";

    await req.session.user.removeAllFromCart(req.body.id);
    res.redirect("/user/cart");
  } catch (err) {
    next(new Error(err));
  }
};
