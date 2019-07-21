"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../../models/product");
exports.getProducts = function (req, res, next) {
    product_1.Product.fetchAll(function (products) {
        res.render('admin/products', {
            pageTitle: 'Products',
            active: 'admin-products',
            prods: products
        });
    });
};
exports.getAddProduct = function (req, res, next) {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        active: 'admin-add-product'
    });
};
exports.getWelcome = function (req, res, next) {
    res.render('admin/welcome', {
        pageTitle: 'Admin login successful',
        active: 'welcome'
    });
};
exports.postAddProduct = function (req, res, next) {
    var title = req.body.title;
    var imageUrl = req.body.imageUrl;
    var price = req.body.price;
    var description = req.body.description;
    var product = new product_1.Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
};
exports.getEditProduct = function (req, res, next) {
    res.render('admin/edit-product', {
        active: 'edit-product'
    });
};
exports.postEditProduct = function (req, res, next) {
    next();
};
