const Product = require('../../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products',{
      pageTitle: 'Products',
      active: 'admin-products',
      prods: products
    });
 });
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product',{
    pageTitle: 'Add Product',
    active: 'admin-add-product'
  });
};
exports.getWelcome = (req, res, next) => {
  res.render('admin/welcome',{
    pageTitle: 'Admin login successful',
    active: 'welcome'
  });
};
exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl
  );
  product.save();
  res.redirect('/');
};
exports.getEditProduct = (req,res,next) => {
  res.render('admin/edit-product',{
    active: 'edit-product'
  })
};
exports.postEditProduct = (req,res,next) => {
  next();
}