import * as express from "express";
import * as adminController from "../controllers/admin/adminController";
import { isAdminAuth } from "../middleware/isAuth";

export const router = express.Router();

router.get("/add-product", isAdminAuth, adminController.getAddProduct);
router.post("/add-product", isAdminAuth, adminController.postAddProduct);

router.get("/edit-product/:id", isAdminAuth, adminController.getEditProduct);
router.get("/view-product/:id", isAdminAuth, adminController.getProductDetail);

router.post("/edit-product", isAdminAuth, adminController.postEditProduct);
router.post("/delete-product", isAdminAuth, adminController.postDeleteProduct);

router.get("/products", isAdminAuth, adminController.getProducts);
router.get("/welcome", isAdminAuth, adminController.getWelcome);
router.use(isAdminAuth, adminController.getNotFound);
