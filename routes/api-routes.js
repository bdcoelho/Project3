const db = require("../models");
const passport = require("../Auth/passport");
const axios = require("axios");
const googleAPI = require("./utils/googleAPI");
const { parseGeoJSON } = require("./utils/googleAPI");
let addressObject = {};
let signUpObject = {};

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
      .get(googleAPI.buildGeoCodeURL(req.body.value, "Place"))
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
    signUpObject.email = req.body.email,
      signUpObject.password = req.body.password,
      signUpObject.firstName = req.body.firstName,
      signUpObject.lastName = req.body.lastName,
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

  // Find all assets of a user
  app.get("/api/myAssets/:userId", (req, res) => {
  db.Asset.find({user_id:req.params.userId})
    .then((response) => res.json(response))
   .catch((err) => res.status(422).json(err));


});

    // Add an asset
    app.post("/api/addAsset", (req, res) => {
      console.log(req.body);
      db.Asset.create(req.body)
       .then((response) => res.json(response))
       .catch((err) => res.status(422).json(err));
      });


// Delete an asset
      app.post("/api/deleteAsset/:id", (req, res) => {
        console.log(req.params.id);
        db.Asset.findByIdAndDelete({ _id: req.params.id })
        .then((response) => res.json(response))
        .catch((err) => res.status(422).json(err));
      });


// Find Users Near
app.get("/api/findUserNear/:id", (req, res) => {
  console.log(req.params.id);
  db.User.find({user_id:req.params.userId})
    .then((response) => res.json(response))
   .catch((err) => res.status(422).json(err));
});






};



