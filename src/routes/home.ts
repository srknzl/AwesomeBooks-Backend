
import * as express from "express";
import * as homeController from "../controllers/home/homeController";

export const router = express.Router();

router.get("/", homeController.getWelcome);

router.use(homeController.getWelcomeNotFound);
