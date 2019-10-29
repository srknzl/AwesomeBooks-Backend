import * as express from "express";
import * as cartController from "../controllers/cartController";
import { isAuth } from "../middleware/isAuth";

export const router = express.Router();

router.get("/cart", isAuth, cartController.getCart);

router.post("/addCart", isAuth, cartController.addToCart);
router.post("/removeFromCart", isAuth, cartController.removeFromCart);
router.post("/removeAllFromCart", isAuth, cartController.removeAllFromCart);