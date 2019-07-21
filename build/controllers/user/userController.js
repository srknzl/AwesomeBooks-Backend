"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../../models/product");
exports.getProducts = function (req, res, next) {
    product_1.Product.fetchAll(function (products) {
        res.render("user/products", {
            pageTitle: "Products",
            prods: products,
            active: "products"
        });
    });
};
exports.getShop = function (req, res, next) {
    product_1.Product.fetchAll(function (products) {
        res.render("user/shop", {
            pageTitle: "Shop",
            prods: products,
            active: "shop"
        });
    });
};
exports.getWelcome = function (req, res, next) {
    res.render("user/welcome", {
        pageTitle: "Welcome",
        active: "welcome"
    });
};
exports.getCart = function (req, res, next) {
    res.render("user/cart", {
        pageTitle: "Cart",
        active: "cart"
    });
};
exports.addToCart = function (req, res, next) {
    console.log("Adding a product to cart with id:", req.body.id);
    res.render("user/cart", {
        pageTitle: "Cart",
        active: "cart"
    });
};
