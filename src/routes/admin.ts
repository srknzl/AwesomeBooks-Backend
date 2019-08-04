import * as express from "express";
import { body } from "express-validator";

import * as adminController from "../controllers/admin/adminController";
import { isAdminAuth } from "../middleware/isAuth";

export const router = express.Router();

router.get("/add-product",isAdminAuth, adminController.getAddProduct);
router.post("/add-product",[
  body('title').isString().isLength({
    min: 5
  }),
  body('price').isFloat({
    min: 0.00,
    max: 1000.00
  }).isDecimal({
    decimal_digits: "0,2"
  }),
  body('imageUrl').isURL(),
  body('description').isLength({
    min: 10,
    max: 300
  }).isString()
], isAdminAuth, adminController.postAddProduct);

router.get("/edit-product/:id", isAdminAuth, adminController.getEditProduct);
router.get("/view-product/:id", isAdminAuth, adminController.getProductDetail);

router.post("/edit-product",[
  body('title').isString().isLength({
    min: 5
  }),
  body('price').isFloat({
    min: 0.00,
    max: 1000.00
  }).isDecimal({
    decimal_digits: "0,2"
  }),
  body('imageUrl').isURL(),
  body('description').isLength({
    min: 10,
    max: 300
  }).isString()
], isAdminAuth, adminController.postEditProduct);

router.post("/delete-product", isAdminAuth, adminController.postDeleteProduct);

router.get("/products", isAdminAuth, adminController.getProducts);
router.get("/welcome", isAdminAuth, adminController.getWelcome);
router.use(isAdminAuth, adminController.getNotFound);
