
const Product = require('../../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products=>{
    res.render('user/products',
    {
      pageTitle: 'Products',
      prods: products,
      active: 'products'
    });
  });
};
exports.getShop = (req, res, next) => {
  Product.fetchAll(products=>{
    res.render('user/shop',
    {
      pageTitle: 'Shop',
      prods: products,
      active: 'shop'
    });
  });
};
exports.getWelcome = (req, res, next) => {
  res.render('user/welcome',{
    pageTitle: 'Welcome',
    active: 'welcome'
  })
};
exports.getCart = (req, res, next) => {
  res.render('user/cart',
    {
      pageTitle: 'Cart',
      active: 'cart'
    });
};
exports.addToCart = (req, res, next) => {
  next();
};