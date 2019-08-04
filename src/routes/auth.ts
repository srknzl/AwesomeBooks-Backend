import * as express from "express";
import * as authController from "../controllers/authController";

export const router = express.Router();

router.get("/login", authController.getLogin);
