const db = require("../models");
const googleAPI = require("../routes/utils/googleAPI");
const axios = require("axios");

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

  logout: function (req, res) {
    req.logout();
    res.redirect("/");
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
    
  }



  //   findById: function(req, res) {
  //     db.Book
  //       .findById(req.params.id)
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   },
  //   create: function(req, res) {
  //     console.log(req.body);
  //     db.Book
  //       .create(req.body)
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   },
  //   update: function(req, res) {
  //     db.Book
  //       .findOneAndUpdate({ _id: req.params.id }, req.body)
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   },
  //   remove: function(req, res) {
  //     db.Book
  //       .findById({ _id: req.params.id })
  //       .then(dbModel => dbModel.remove())
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   }
};
