import { RequestHandler } from "express";
import { hash, compare } from "bcrypt";
import { validationResult } from "express-validator";
import crypto from "crypto";
import sendgridMail from "@sendgrid/mail";

import User from "../models/user";
import Admin from "../models/admin";


if (process.env.NODE_ENV === "production" && process.env.SENDGRID_API) {
  sendgridMail.setApiKey(process.env.SENDGRID_API);
} else {
  sendgridMail.setApiKey(require("../credentials/sendgrid").apiKey);
}

export const getLogin: RequestHandler = (req, res, next) => {

  res.render("auth/login", {
    active: "login",
    pageTitle: "Login",
    validationMessages: [],
    autoFill: {}
  });
};

export const getSignup: RequestHandler = (req, res, next) => {

  res.render("auth/signup", {
    active: "signup",
    pageTitle: "Signup",
    validationMessages: [],
    autoFill: {}
  });
};
export const getAdminLogin: RequestHandler = (req, res, next) => {

  res.render("auth/admin-login", {
    active: "admin-login",
    pageTitle: "Admin login",
    validationMessages: [],
    autoFill: {}
  });
};
export const getReset: RequestHandler = (req, res, next) => {

  res.render("auth/reset", {
    active: "",
    pageTitle: "Reset your password",
    validationMessages: [],
    autoFill: {}
  });
};
export const getNewPassword: RequestHandler = async (req, res, next) => {
  const token = req.params.token;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: {
      $gt: Date.now()
    }
  });

  if (!user) {
    req.flash("error", "Your token is not valid!");
    return res.redirect("/");
  }

  res.render("auth/new-password", {
    active: "",
    pageTitle: "Update your password",
    validationMessages: [],
    autoFill: {},
    token: token
  });
};
export const postLogin: RequestHandler = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  const valErrors = validationResult(req);
  if (!valErrors.isEmpty()) {
    const errors = req.flash("error");
    const successes = req.flash("success");
    return res.status(422).render("auth/login", {
      active: "login",
      pageTitle: "Login",
      validationMessages: valErrors.array(),
      errors: errors,
      successes: successes,
      autoFill: {
        email: email,
        password: password
      }
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
        const errors = req.flash("error");
        return res.status(401).render("auth/login", {
          active: "login",
          pageTitle: "Login",
          validationMessages: [],
          autoFill: {
            email: email,
            password: password
          },
          errors: errors
        });
      }
    } else {
      req.flash("error", "Email or password was wrong");
      const errors = req.flash("error");
      return res.status(401).render("auth/login", {
        active: "login",
        pageTitle: "Login",
        validationMessages: [],
        autoFill: {
          email: email,
          password: password
        },
        errors: errors
      });
    }
  } catch (error) {
    req.flash('error', 'Something went wrong.');
    return res.redirect('/login');
  }
};
export const postSignup: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const confirmPassword = req.body.confirmPassword;

  const valErrors = validationResult(req);

  if (!valErrors.isEmpty()) {
    const errors = req.flash("error");
    const successes = req.flash("success");
    
    return res.status(422).render("auth/signup", {
      active: "signup",
      pageTitle: "Signup",
      validationMessages: valErrors.array(),
      errors: errors,
      successes: successes,
      autoFill: {
        email: email,
        password: password,
        name: name,
        confirmPassword: confirmPassword
      }
    });
  }

  const foundUser = await User.findOne({
    email: email
  });

  if (foundUser) {
    req.flash("error", "Email is already in use!");
    const errors = req.flash("error");
    const successes = req.flash("success");
    return res.status(422).render("auth/signup", {
      active: "signup",
      pageTitle: "Signup",
      validationMessages: [],
      autoFill: {
        email: email,
        password: password,
        name: name,
        confirmPassword: confirmPassword
      },
      errors: errors,
      successes: successes
    });
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

  const valErrors = validationResult(req);

  if (!valErrors.isEmpty()) {
    const errors = req.flash("error");
    const successes = req.flash("success");
    return res.status(422).render("auth/admin-login", {
      active: "admin-login",
      pageTitle: "Admin login",
      validationMessages: valErrors.array(),
      errors: errors,
      successes: successes,
      autoFill: {
        email: email,
        password: password
      }
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

        return res.status(401).render("auth/admin-login", {
          active: "admin-login",
          pageTitle: "Admin login",
          validationMessages: [],
          autoFill: {
            email: email,
            password: password
          }
        });
      }
    } else {
      req.flash("error", "Email or password was wrong");

      return res.status(401).render("auth/admin-login", {
        active: "admin-login",
        pageTitle: "Admin login",
        validationMessages: [],
        autoFill: {
          email: email,
          password: password
        }
      });
    }
  } catch (error) {
    req.flash('error', 'Something went wrong');
    console.error(error);
    return res.redirect('/admin-login');
  }
};
export const postLogout: RequestHandler = (req, res, next) => {
  if (!req.session) throw "No session";

  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect("/");
  });
};

export const postReset: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const valErrors = validationResult(req);

  if (!valErrors.isEmpty()) {
    const errors = req.flash("error");
    const successes = req.flash("success");
    return res.status(422).render("auth/reset", {
      active: "",
      pageTitle: "Reset your password",
      validationMessages: valErrors,
      errors: errors,
      successes: successes,
      autoFill: {
        email: email
      }
    });
  }
  const user = await User.findOne({
    email: email
  });
  if (!user) {
    req.flash("error", "This e-mail is not associated with an account!");
    const errors = req.flash("error");
    const successes = req.flash("success");
    return res.status(422).render("auth/reset", {
      active: "",
      pageTitle: "Reset your password",
      validationMessages: [],
      errors: errors,
      successes: successes,
      autoFill: {
        email: email
      }
    });
  }
  const bytes = crypto.randomBytes(32);

  const hex = bytes.toString("hex");

  user.resetToken = hex;
  user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);

  await user.save();

  try {
    const msg = {
      to: email,
      from: 'reset@awesomebookshop.com',
      subject: "Password Reset",
      text: 'and easy to do anywhere, even with Node.js',
      html: `
      <h3>Password reset link</h3>
      <hr>
      <p> You requested a password reset, and here is your <a href="http://localhost:3000/newPassword/${hex}">link</a>.  </p>
      <p> Please note that this url can be used once and has 1 hour to expire.</p>
      <p> <b>Please do not share this link with anyone</b>, including AwesomeShop representatives.</p>
      <p> Thanks for securing your account.</p>
    `
    };
    sendgridMail.send(msg);
  } catch (error) {
    req.flash("error", "Could not send the e-mail, please contact site owner.");
    return res.redirect("/");
  }

  req.flash("success", "Email sent!");
  res.redirect("/");
};

export const postNewPassword: RequestHandler = async (req, res, next) => {
  const token = req.body.token;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  const valErrors = validationResult(req);

  if (!valErrors.isEmpty()) {
    const errors = req.flash("error");
    const successes = req.flash("success");
    return res.status(422).render("auth/new-password", {
      active: "",
      pageTitle: "Update your password",
      validationMessages: valErrors.array(),
      errors: errors,
      successes: successes,
      autoFill: {
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword
      },
      token: token
    });
  }

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: {
        $gt: Date.now()
      }
    });
    if (!user) {
      req.flash(
        "error",
        "Your token is not valid, try sending a new token to your e-mail."
      );
      return res.redirect("/");
    } else {
      const hashPass = await hash(newPassword, 12);

      await User.updateOne(
        {
          resetToken: token,
          resetTokenExpiry: {
            $gt: Date.now()
          }
        },
        {
          $set: {
            password: hashPass,
            resetToken: undefined,
            resetTokenExpiry: undefined
          }
        }
      );
      req.flash("success", "Successfully updated your password");
      res.redirect("/login");
    }
  } catch (error) {
    req.flash("error", "Something went wrong, could not update the password");
    res.redirect("/login");
    console.error(error);
  }
};
