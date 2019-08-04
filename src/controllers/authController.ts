import { RequestHandler } from "express";
import { hash,compare } from "bcrypt";
import User from "../models/user";

export const getLogin: RequestHandler = (req, res, next) => {
  res.render('auth/login',{
    active:'login',
    pageTitle: 'Login'
  });
};
export const getSignup: RequestHandler = (req, res, next) => {
  res.render('auth/signup',{
    active:'signup',
    pageTitle: 'Signup'
  });
};
export const getAdminLogin: RequestHandler = (req, res, next) => {
  res.render('auth/admin-login',{
    active:'admin-login',
    pageTitle: 'Admin login'
  });
};
export const postLogin: RequestHandler = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  const user = await User.findOne({
    email: email
  });
  if(user){
    const match = await compare(password, user.password);

    if(match && req.session){
      req.session.user = user;
      res.redirect('/user/welcome');
    }
  }
};
export const postSignup: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashPass = await hash(password,12);
  

};
export const postAdminLogin: RequestHandler = (req, res, next) => {
  
};