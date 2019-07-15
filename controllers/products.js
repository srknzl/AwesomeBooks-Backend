const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product',{
    pageTitle: 'Add Product',
    active: 'add-product'
  });
};
exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};
exports.getProducts = (req, res, next) => {
  res.render('shop',
  {
    pageTitle: 'Shop',
    prods: products,
    active: 'shop'
  });
};