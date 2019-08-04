import { RequestHandler } from "express";

export const getLogin: RequestHandler = (req, res, next) => {
  res.render('auth/login',{
    active:'login',
    pageTitle: 'Login'
  });
};
