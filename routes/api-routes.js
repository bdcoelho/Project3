const db = require("../models");
const passport = require("../Auth/passport");
const axios = require("axios");
const googleAPI = require("./utils/googleAPI");
const { parseGeoJSON } = require("./utils/googleAPI");
const controller = require("../controllers/controller");

let signUpObject = {};

module.exports = (app) => {
  // Login routing
  app.post("/api/login", passport.authenticate("local"), controller.login);

  app.post("/api/addressSearch", controller.addressSearch);

  // Signup routing
  app.post("/api/signup", (req, res) => {
    (signUpObject.email = req.body.email),
      (signUpObject.password = req.body.password),
      (signUpObject.firstName = req.body.firstName),
      (signUpObject.lastName = req.body.lastName),
      axios
        .get(googleAPI.buildGeoCodeURL(req.body.address, "GeoCode"))
        .then((response) => {
          let resArray = response.data.results[0];
          let coordsArray = [];
          addressArray = resArray.address_components;
          addressArray.forEach(googleAPI.parseGeoJSON, signUpObject);
          coordsArray.push(
            resArray.geometry.location.lng,
            resArray.geometry.location.lat
          );
          console.log(coordsArray);
          signUpObject.geometry = { type: "point", coordinates: coordsArray };
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
  app.get("/api/logout", (req,res)=>{
  req.logout();
  res.redirect("/");
  });

  // getting user data if they are logged in
  app.get("/api/user_data", controller.getUserData);

  // Find all assets of a user
  app.get("/api/myAssets/:userId", controller.userAsset);

  // Add an asset
  app.post("/api/addAsset", controller.addAsset);

  // Delete an asset
  app.post("/api/deleteAsset/:id", controller.deleteAsset);

  // Find Users Near
  app.get("/api/findUserNear/", controller.findNear);
};
