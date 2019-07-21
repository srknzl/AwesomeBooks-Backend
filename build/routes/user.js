"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var userController = __importStar(require("../controllers/user/userController"));
exports.router = express.Router();
exports.router.get('/welcome', userController.getWelcome);
exports.router.get('/shop', userController.getShop);
exports.router.get('/products', userController.getProducts);
exports.router.get('/cart', userController.getCart);
exports.router.post('/add-cart', userController.addToCart);
