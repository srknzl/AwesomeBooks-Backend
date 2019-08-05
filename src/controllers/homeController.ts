import { RequestHandler } from "express";

export const getWelcome: RequestHandler = (req, res, next) => {
  const successes = req.flash('success');
  const errors = req.flash('error');

  res.render("welcome", {
    pageTitle: "Awesome bookstore",
    active: "welcome",
    errors: errors,
    successes: successes,
    validationMessages: []
  });
};
export const getWelcomeNotFound: RequestHandler = (req, res, next) => {
  res.status(404).render("errors/welcome-not-found", {
    pageTitle: "Not found"
  });
};
