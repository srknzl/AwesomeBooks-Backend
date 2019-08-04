import { RequestHandler } from "express";
import { hash, compare } from "bcrypt";
import { validationResult } from "express-validator";

import User from "../models/user";
import Admin from "../models/admin";

export const getLogin: RequestHandler = (req, res, next) => {
  const successes = req.flash("success");
  const errors = req.flash("error");

  res.render("auth/login", {
    active: "login",
    pageTitle: "Login",
    successes: successes,
    errors: errors,
    validationMessages: []
  });
};
export const postLogout: RequestHandler = (req, res, next) => {
  if (!req.session) throw "No session";

  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect("/");
  });
};
export const getSignup: RequestHandler = (req, res, next) => {
  const errors = req.flash("error");
  const successes = req.flash("success");

  res.render("auth/signup", {
    active: "signup",
    pageTitle: "Signup",
    errors: errors,
    successes: successes,
    validationMessages: []
  });
};
export const getAdminLogin: RequestHandler = (req, res, next) => {
  const errors = req.flash("error");
  const successes = req.flash("success");

  res.render("auth/admin-login", {
    active: "admin-login",
    pageTitle: "Admin login",
    errors: errors,
    successes: successes,
    validationMessages: []
  });
};
export const postLogin: RequestHandler = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      active: "login",
      pageTitle: "Login",
      successes: [],
      errors: [],
      validationMessages: errors.array()
    });
  }

  try {
    const user = await User.findOne({
      email: email
    });
    if (user) {
      const match = await compare(password, user.password);

      if (match && req.session) {
        req.session.user = user;
        req.session.userLoggedIn = true;
        return res.redirect("/user/welcome");
      } else {
        req.flash("error", "Email or password was wrong");
        return res.redirect("/login");
      }
    } else {
      req.flash("error", "Email or password was wrong");
      return res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
  }
  next();
};
export const postSignup: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      active: "signup",
      pageTitle: "Signup",
      errors: [],
      successes: [],
      validationMessages: errors.array()
    });
  }

  const foundUser = await User.findOne({
    email: email
  });

  if (foundUser) {
    req.flash("error", "Email is already in use!");
    return res.redirect("/signup");
  }

  const hashPass = await hash(password, 12);

  const user = new User({
    password: hashPass,
    name: name,
    email: email,
    cart: {
      items: []
    }
  });

  await user.save();

  req.flash("success", "Successfully signed up!");
  res.redirect("/login");
};

export const postAdminLogin: RequestHandler = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("auth/admin-login", {
      active: "admin-login",
      pageTitle: "Admin login",
      errors: [],
      successes: [],
      validationMessages: errors.array()
    });
  }

  try {
    const admin = await Admin.findOne({
      email: email
    });
    if (admin) {
      const match = await compare(password, admin.password);

      if (match && req.session) {
        req.session.admin = admin;
        req.session.adminLoggedIn = true;
        return res.redirect("/admin/welcome");
      } else {
        req.flash("error", "Email or password was wrong");
        return res.redirect("/admin-login");
      }
    } else {
      req.flash("error", "Email or password was wrong");
      return res.redirect("/admin-login");
    }
  } catch (error) {
    console.error(error);
  }
  next();
};
