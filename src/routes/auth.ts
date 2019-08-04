import * as express from "express";
import { body } from "express-validator";

import * as authController from "../controllers/authController";

export const router = express.Router();

router.get("/login", authController.getLogin);
router.get("/signup",authController.getSignup);
router.get("/admin-login",authController.getAdminLogin);

router.post('/logout',authController.postLogout);

router.post("/login",[
  body('email').isEmail(),
  body('password').isLength({
    min: 6
  })
], authController.postLogin);

router.post("/signup",[
  body('email').isEmail(),
  body('name').isString().isLength({
    min: 3
  }),
  body('password').isLength({
    min: 6
  }),
  body('confirmPassword').custom((value,{req}) => {
    if(req.body.password !== value){
      throw new Error('Passwords did not match');
    }
    return true;
  })
],authController.postSignup);

router.post("/admin-login",[
  body('email').isEmail(),
  body('password').isLength({
    min: 6
  })
],authController.postAdminLogin);