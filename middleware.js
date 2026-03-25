const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  return next();
};

module.exports = isLoggedIn;

module.exports.saveRedirectUrl = (req, res, next) => {
   if (req.session.redirectUrl) {
     res.locals.redirectUrl = req.session.redirect;
   }
   next();
}
