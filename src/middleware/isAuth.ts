import { RequestHandler } from "express";

export const isAuth: RequestHandler = (req, res, next) => {
  if (req.session && req.session.userLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};
export const isAdminAuth: RequestHandler = (req, res, next) => {
  if (req.session && req.session.adminLoggedIn) {
    next();
  } else {
    res.redirect("/admin-login");
  }
};
