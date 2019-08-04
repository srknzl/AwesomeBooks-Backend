import * as express from "express";
import * as authController from "../controllers/authController";

export const router = express.Router();

router.get("/login", authController.getLogin);
router.get("/signup",authController.getSignup);
router.get("/admin-login",authController.getAdminLogin);

router.post("/login", authController.postLogin);
router.post("/signup",authController.postSignup);
router.post("/admin-login",authController.postAdminLogin);