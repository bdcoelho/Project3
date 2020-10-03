const db = require("../models");
const passport = require("../Auth/passport");

module.exports = app => {

    // Login routing
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        res.json({
          email: req.user.email,
          id: req.user.id
        });
      });

      // Signup routing
      app.post("/api/signup", (req, res) => {
        db.User.create({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        })
          .then(() => {
            res.redirect(307, "/api/login");
          })
          .catch(err => {
            res.status(401).json(err);
          });
      });

      // Logging out routing
      app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
      });

      // getting user data if they are logged in
      app.get("/api/user_data", (req, res) => {
        if (!req.user) {
          res.json({});
        } else {
          res.json({
            email: req.user.email,
            id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName
          });
        }
      });
}