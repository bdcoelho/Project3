const db = require("../models");
const passport = require("../Auth/passport");
const querystring = require("querystring");
const axios = require("axios");
require("dotenv").config();
let addressObject = {};
let signUpObject = {};



const appSecret = process.env.GOOGLE_MAPS_API_KEY;

function buildGeoCodeURL(searchTerm, type) {
  let queryURL = "";
  var queryParams = { key: appSecret };
  if (type === "Place") {
    queryURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
    queryParams.input = searchTerm.trim().toLowerCase().includes("australia")
      ? searchTerm.trim()
      : searchTerm.trim() + " Australia";
  } else if (type === "GeoCode") {
    queryURL = "https://maps.googleapis.com/maps/api/geocode/json?";
    queryParams.address = searchTerm.trim();
  }
  return queryURL + querystring.stringify(queryParams);
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
      .get(buildGeoCodeURL(req.body.value, "Place"))
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
    (signUpObject.email = req.body.email),
      (signUpObject.password = req.body.password),
      (signUpObject.firstName = req.body.firstName),
      (signUpObject.lastName = req.body.lastName),
      axios
        .get(buildGeoCodeURL(req.body.address, "GeoCode"))
        .then((response) => {
          let resArray = response.data.results[0]
          let coordsArray = [];
          addressArray = resArray.address_components;
          addressArray.forEach((element) => {
            if (element.types.includes("street_number")) {
              signUpObject.streetNum = element.long_name;
            } else if (element.types.includes("route")) {
              signUpObject.streetName = element.long_name;
            } else if (element.types.includes("locality")) {
              signUpObject.suburb = element.long_name;
            } else if (element.types.includes("administrative_area_level_1")) {
              signUpObject.state = element.long_name;
            } else if (element.types.includes("postal_code")) {
              signUpObject.postCode = element.long_name;
            }
          });
          coordsArray.push(resArray.geometry.location.lng,resArray.geometry.location.lat)
          console.log(coordsArray)
          signUpObject.geometry={"type":"point", "coordinates": coordsArray}
          db.User.create(signUpObject)
            .then(() => {
              res.redirect(307, "/api/login");
            })
            .catch((err) => {
              res.status(401).json(err);
            });
        })
        .catch((err) => {
          console.error(err);
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
