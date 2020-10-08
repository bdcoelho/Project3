const db = require("../models");
const axios = require("axios");
const googleAPI = require("./googleAPIController");
let addressObject = {};
let signUpObject = {};


module.exports = {
  findNear: function (req, res) {
    db.User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
          },
          distanceField: "dist.calculated",
          maxDistance: 1000,
          //  query: { category: "Parks" },
          spherical: true,
        },
      },
    ])

      .then((response) => res.send({ length: response.length }))
      .catch((err) => res.status(422).json(err));
  },

  deleteAsset: function (req, res) {
    db.Asset.findByIdAndDelete({ _id: req.params.id })
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },

  addAsset: function (req, res) {
    db.Asset.create(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },

  userAsset: function (req, res) {
    db.Asset.find({ user_id: req.params.userId })
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },

  getUserData: function (req, res) {
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
  },

  addressSearch: function (req, res) {
    axios
      .get(googleAPI.buildGeoCodeURL(req.body.value, "Place"))
      .then((response) => {
        addressObject = response.data;
        res.send(addressObject);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  login: function (req, res) {
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  },

  logout: function (req, res) {
    req.logout();
    res.redirect("/");
  },

  signup: function (req, res) {

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
  },

  findCategories: function (req,res) {
    // db.Item.find()

    db.Item.distinct('Category')
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },





};
