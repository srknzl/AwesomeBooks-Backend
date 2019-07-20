const express = require('express');
const userController = require('../controllers/user/userController');

const router = express.Router();

router.get('/welcome', userController.getWelcome);
router.get('/shop',userController.getShop)
router.get('/products',userController.getProducts);

router.get('/cart',userController.getCart);
router.post('/add-cart',userController.addToCart);


module.exports = router;