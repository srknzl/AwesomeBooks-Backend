exports.getUserNotFound = (req,res,next) => {
  res.status(404).render('errors/user-not-found',{
    pageTitle: "Not found",
  });
};
exports.getAdminNotFound = (req,res,next) => {
  res.status(404).render('errors/admin-not-found',{
    pageTitle: "Not found",
  });
};
exports.getWelcomeNotFound = (req,res,next) => {
  res.status(404).render('errors/welcome-not-found',{
    pageTitle: "Not found",
  });
};