const db = require("../models");
const axios = require("axios");
const googleAPI = require("./googleAPIController");
const querystring = require("querystring");
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
    console.log(req.body);
    console.log("about to delete");
    // db.Asset.findById(req.body.assetId)
    //   .then((asset) => {
    //     let userId = asset.user_id;
    //     console.log(userId);
    let userId  =req.body.userId;
    console.log(userId);
        db.User.find({ _id: userId })
          .then((user) => {
            console.log(user);
          })
          .catch((err) => console.log(err));
      //   res.json(asset);
      // })

      // db.User.findById(req.body.userId).then((user) => {
      //   console.log(user);
      // })

      // .catch((err) => res.status(422).json(err));
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
      console.log(req.user);
      res.json({
        email: req.user.email,
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        lng: req.user.geometry.coordinates[0],
        lat: req.user.geometry.coordinates[1],
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
  },

  findCategories: function (req, res) {
    // db.Item.find()

    db.Item.distinct("category")
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },

  findItems: function (req, res) {
    console.log(req.params);
    db.Item.find(req.params, { item: 1, _id: 0 })
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },

  findItemsNear: function (req, res) {
    let responseArray = [];
    console.log(req.body);
    // res.json(req.body);
    db.User.aggregate([
      // Stage 1
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
          },
          distanceField: "dist.calculated",
          minDistance: 1,
          maxDistance: req.body.distance * 1000,
          //  query: { category: "Parks" },
          spherical: true,
        },
      },

      // Stage 2
      {
        $lookup: {
          from: "assets",
          localField: "assets",
          foreignField: "_id",
          as: "userAssets",
        },
      },
      // Stage 3

      { $match: { "userAssets.name": req.body.item } },

      // HOW TO QUERY ARRAY. instock is an array, warehouse is a property inside the array, A is the Value.
      // db.inventory.find( { "instock.warehouse": "A" } )
    ])
      .then((users) => {
        const queryFilter = (asset) => {
          if (asset.name === req.body.item) {
            return asset;
          }
        };

        // console.log(users)
        users.map((user) => {
          let userAssets = user.userAssets;
          let filterAssets = userAssets.filter(queryFilter);
          filterAssets.forEach((filterAsset) => {
            filterAsset.dist = user.dist.calculated;
            filterAsset.streetNum = user.streetNum;
            filterAsset.streetName = user.streetName;
            filterAsset.suburb = user.suburb;
            filterAsset.state = user.state;
            filterAsset.postCode = user.postCode;
            responseArray.push(filterAsset);
          });

          console.log(responseArray);
        });
        res.json(responseArray);
      })

      .then(console.log("hello"))
      .catch((err) => res.status(422).json(err));
  },
};
