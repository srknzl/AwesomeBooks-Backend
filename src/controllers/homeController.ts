import { RequestHandler } from "express";

export const getWelcome: RequestHandler = (req, res, next) => {
  res.render("welcome", {
    pageTitle: "Awesome bookstore",
    active: "welcome",
    validationMessages: []
  });
};
export const get404: RequestHandler = (req, res, next) => {
  res.status(404).render("errors/404", {
    pageTitle: "Not found",
    userLoggedIn: (req as any).session.userLoggedIn,
    adminLoggedIn: (req as any).session.adminLoggedIn
  });
};
export const get500: RequestHandler = (req, res, next) => {
  res.status(500).render("errors/500", {
    pageTitle: "Error",
    userLoggedIn: (req as any).session.userLoggedIn,
    adminLoggedIn: (req as any).session.adminLoggedIn
  });
};
