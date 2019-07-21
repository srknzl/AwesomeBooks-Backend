import { RequestHandler } from "express";

export const getUserNotFound: RequestHandler = (req, res, next) => {
  res.status(404).render("errors/user-not-found", {
    pageTitle: "Not found"
  });
};
export const getAdminNotFound: RequestHandler = (req, res, next) => {
  res.status(404).render("errors/admin-not-found", {
    pageTitle: "Not found"
  });
};
export const getWelcomeNotFound: RequestHandler = (req, res, next) => {
  res.status(404).render("errors/welcome-not-found", {
    pageTitle: "Not found"
  });
};
