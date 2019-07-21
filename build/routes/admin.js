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
var adminController = __importStar(require("../controllers/admin/adminController"));
exports.router = express.Router();
exports.router.get('/add-product', adminController.getAddProduct);
exports.router.post('/add-product', adminController.postAddProduct);
exports.router.get('/edit-product/:id', adminController.getEditProduct);
exports.router.post('/edit-product/:id', adminController.postEditProduct);
exports.router.get('/products', adminController.getProducts);
exports.router.get('/welcome', adminController.getWelcome);
