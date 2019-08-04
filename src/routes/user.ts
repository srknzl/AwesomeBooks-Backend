import * as express from "express";
import * as userController from "../controllers/user/userController";
import { isAuth } from "../middleware/isAuth";

export const router = express.Router();

router.get("/welcome", isAuth, userController.getWelcome);
router.get("/shop", userController.getShop);
router.get("/products", userController.getProducts);
router.get("/view-product/:id", userController.getProductDetail);
router.get("/cart", isAuth, userController.getCart);
router.get("/orders", isAuth, userController.getOrders);

router.post("/add-cart", isAuth, userController.addToCart);
router.post("/remove-from-cart", isAuth, userController.removeFromCart);
router.post("/remove-all-from-cart", isAuth, userController.removeAllFromCart);
router.post("/order", isAuth, userController.addOrder);

router.use(isAuth, userController.getNotFound);
