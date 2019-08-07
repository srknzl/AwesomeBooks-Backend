import * as express from "express";
import * as homeController from "../controllers/homeController";

export const router = express.Router();

router.get("/", homeController.getWelcome);

router.get('/500',homeController.get500);
router.use(homeController.get404);
