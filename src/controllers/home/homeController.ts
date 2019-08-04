import { RequestHandler } from "express";

export const getWelcome: RequestHandler = (req, res, next) => {
  res.render("welcome", {
    pageTitle: "Awesome bookstore",
    active: "welcome"
  });
};
export const getWelcomeNotFound: RequestHandler = (req, res, next) => {
  res.status(404).render("errors/welcome-not-found", {
    pageTitle: "Not found"
  });
};
