const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product',{
    pageTitle: 'Add Product',
    active: 'add-product'
  });
};
exports.postAddProduct = (req, res, next) => {
  const product = new Product();
  product.save();
  res.redirect('/');
};
exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop',
  {
    pageTitle: 'Shop',
    prods: products,
    active: 'shop'
  });
};