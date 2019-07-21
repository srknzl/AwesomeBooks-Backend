import * as express from "express";
import * as adminController from "../controllers/admin/adminController";

export const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:id',adminController.getEditProduct);
router.post('/edit-product/:id',adminController.postEditProduct);

router.get('/products', adminController.getProducts);
router.get('/welcome',adminController.getWelcome);