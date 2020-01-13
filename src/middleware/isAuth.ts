import { Request, Response, NextFunction, RequestHandler } from "express";

export const isAuth : RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
  if (req.session && req.session.userLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};
export const isAdminAuth : RequestHandler = (req: Request, res: Response, next:NextFunction) : any => {
  if (req.session && req.session.adminLoggedIn) {
    next();
  } else {
    res.redirect("/admin-login");
  }
};
