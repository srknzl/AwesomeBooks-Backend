import * as express from "express";
import { body } from "express-validator";

import * as productController from "../controllers/productController";
import { isAdminAuth } from "../middleware/isAuth";

export const router = express.Router();

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getProductDetail);

router.post(
  "/add-product",
  [
    body("title")
      .isString()
      .withMessage("Title must be a text")
      .isLength({
        min: 5
      })
      .withMessage("Title should have at least five characters"),
    body("price")
      .isFloat({
        min: 0.0,
        max: 1000.0
      })
      .withMessage("Price must be between 0 and 1000")
      .isDecimal({
        decimal_digits: "0,2"
      })
      .withMessage("Price can have 2 decimals steps"),
    body("description")
      .isLength({
        min: 10,
        max: 300
      })
      .withMessage(
        "Description must have at least 10 characters, maximum of 300."
      )
      .isString()
      .withMessage("Description must be a string")
  ],
  isAdminAuth,
  productController.postAddProduct
);

router.put(
  "/edit-product",
  [
    body("title")
      .isString()
      .withMessage("Title must be a text")
      .isLength({
        min: 5
      })
      .withMessage("Title should have at least five characters"),
    body("price")
      .isFloat({
        min: 0.0,
        max: 1000.0
      })
      .withMessage("Price must be between 0 and 1000")
      .isDecimal({
        decimal_digits: "0,2"
      })
      .withMessage("Price can have 2 decimals steps"),
    body("description")
      .isLength({
        min: 10,
        max: 300
      })
      .withMessage(
        "Description must have at least 10 characters, maximum of 300."
      )
      .isString()
      .withMessage("Description must be a string")
  ],
  isAdminAuth,
  productController.postEditProduct
);

router.delete("/product/delete/:prodId", isAdminAuth, productController.deleteProduct);
export default router;