import * as express from "express";
import * as adminController from "../controllers/admin/adminController";

export const router = express.Router();

 router.get('/add-product', adminController.getAddProduct);
 router.post('/add-product', adminController.postAddProduct);

 router.get('/edit-product/:id',adminController.getEditProduct);
 router.get('/view-product/:id',adminController.getProductDetail);

 router.post('/edit-product',adminController.postEditProduct);
 router.post('/delete-product',adminController.postDeleteProduct);

 router.get('/products', adminController.getProducts);
 router.get('/welcome',adminController.getWelcome);
 router.use('/',adminController.getNotFound);