import * as express from "express";
import * as orderController from "../controllers/orderController";
import { isAuth } from "../middleware/isAuth";

export const router = express.Router();

router.get("/orders", isAuth, orderController.getOrders);
router.get("/invoices/:orderId",orderController.getInvoice);

router.post("/order", isAuth, orderController.addOrder);