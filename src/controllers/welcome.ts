import { RequestHandler } from "express";

export const getWelcomePage: RequestHandler = (req, res, next) => {
  res.render("welcome", {
    pageTitle: "Awesome bookstore"
  });
};
