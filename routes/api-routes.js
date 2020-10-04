const db = require("../models");
const passport = require("../Auth/passport");
const querystring = require("querystring");
const axios = require("axios");
require("dotenv").config();
let addressObject = {};
const queryString =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
const appSecret = process.env.GOOGLE_MAPS_API_KEY;
// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=8 James St glenhuntly Australia&key=AIzaSyDyO_UovT4ONWNjfYGnYpN_EnFBaw9Bolg

function buildGeoCodeURL(searchTerm) {
  var queryURLGeo = queryString;
  var queryParams = { key: appSecret };
  queryParams.input = searchTerm.trim();
  return queryURLGeo + querystring.stringify(queryParams);
}

module.exports = (app) => {
  // Login routing
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  app.post("/api/addressSearch", (req, res) => {

    axios
      .get(buildGeoCodeURL(req.body.value))
      .then((response) => {
        addressObject = response.data;
        res.send(addressObject);
      })
      .catch((err) => {
        console.error(err);
      });

  });

  // Signup routing
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      streetNum: req.body.streetNum,
      streetName: req.body.streetName,
      suburb: req.body.suburb,
      state: req.body.state,
      postCode: req.body.postCode,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
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
        lastName: req.user.lastName,
      });
    }
  });
};
