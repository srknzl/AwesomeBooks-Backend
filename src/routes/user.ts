import * as express from "express";
import * as userController from '../controllers/user/userController';

export const router = express.Router();

router.get('/welcome', userController.getWelcome);
router.get('/shop',userController.getShop)
router.get('/products',userController.getProducts);

router.get('/cart',userController.getCart);
router.post('/add-cart',userController.addToCart);