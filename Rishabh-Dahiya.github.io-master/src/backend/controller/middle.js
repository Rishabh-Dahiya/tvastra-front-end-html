const redirectprofile = (req, res, next) => {
    if (!req.session.email) {
      res.redirect("/");
    } else {
      next();
    }
  };
  
module.exports= {
    redirectprofile: redirectprofile
};