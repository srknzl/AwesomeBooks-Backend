exports.getWelcomePage = (req, res, next) => {
  res.render('welcome',{
    pageTitle: 'Awesome bookstore'
  });
} 