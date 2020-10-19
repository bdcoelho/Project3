const db = require("../models");
const axios = require("axios");
const googleAPI = require("./googleAPIController");
let addressObject = {};
let signUpObject = {};
const mongoose = require("mongoose");

module.exports = {
  deleteAsset: function (req, res) {
    db.Asset.findByIdAndDelete(req.params.id)
      .then((asset) => {
        db.User.findByIdAndUpdate(
          asset.user_id,
          { $pull: { assets: req.params.id } },
          { new: true }
        )
          .then((user) => {
            res.json({Result:"Item deleted successfully"});
          })
          .catch((err) => {
            console.log(err);
            res.status(422).json(err);
          });
      })

      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },

  modifyAsset: function (req, res) {
    const updateObj = {};

    if (req.file) {
      updateObj.image = req.file.filename;
    }
    formJSON = JSON.parse(req.body.formData);
    updateObj.name = formJSON.name;
    updateObj.description = formJSON.description;
    updateObj.dailyPrice = formJSON.dailyPrice;

    db.Asset.findByIdAndUpdate(formJSON.id, updateObj)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => res.status(422).json(err));
  },

  addAsset: function (req, res) {
    formJSON = JSON.parse(req.body.formData);
    const updateObj = {
      user_id: formJSON.user_id,
      category: formJSON.category,
      name: formJSON.name,
      description: formJSON.description,
      dailyPrice: formJSON.dailyPrice,
      image: req.file.filename,
    };

    db.Asset.create(updateObj)
      .then((asset) => {
        db.User.findByIdAndUpdate(
          asset.user_id,
          { $push: { assets: asset._id } },
          { new: true }
        )
          .then((user) => {
            res.json({Result:"Asset added successfully"});
          })
          .catch((err) => {
            console.log(err);
            res.status(422).json(err);
          });
      })
      .catch((err) => res.status(422).json(err));
  },

  userAsset: function (req, res) {
    db.Asset.find({ user_id: req.params.userId })
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },

  book: function (req, res) {
    db.Asset.findByIdAndUpdate(
      req.body.asset_id,
      {
        $push: {
          bookings: [
            {
              user_id: req.body.user_id,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
            },
          ],
        },
      },
      { new: true }
    )
      .then((asset) => {
        db.User.findByIdAndUpdate(
          req.body.user_id,
          {
            $push: {
              assetBookings: [
                {
                  asset_id: asset._id,
                  startDate: req.body.startDate,
                  endDate: req.body.endDate,
                },
              ],
            },
          },
          { new: true }
        )
          .then((user) => {
            res.json({Result:"Booking Successful"});
          })
          .catch((err) => {
            console.log(err);
            res.status(422).json(err);
          });
      })

      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
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
    db.Item.find(req.params, { item: 1, _id: 0 })
      .then((response) => res.json(response))
      .catch((err) => res.status(422).json(err));
  },

  userBooking: function (req, res) {
    db.User.aggregate([
      // Stage 1
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.userId) },
      },

      // Stage 2
      {
        $lookup: {
          from: "assets",
          localField: "assetBookings.asset_id",
          foreignField: "_id",
          as: "userAssetBookings",
        },
      },

      {
        $unwind: "$userAssetBookings",
      },

      // Stage 3
      {
        $lookup: {
          from: "users",
          localField: "userAssetBookings.user_id",
          foreignField: "_id",
          as: "bookingOwner",
        },
      },
    ])

      .then((response) => {
        let bookingArray = [];

        response.forEach((booking, index) => {
          let bookingObject = booking.assetBookings[index];
          bookingObject.name = booking.userAssetBookings.name;
          bookingObject.dailyPrice = booking.userAssetBookings.dailyPrice;
          bookingObject.ownerFirstName = booking.bookingOwner[0].firstName;
          bookingObject.ownerLastName = booking.bookingOwner[0].lastName;
          bookingObject.ownerEmail = booking.bookingOwner[0].email;
          bookingObject.ownerStreetNum = booking.bookingOwner[0].streetNum;
          bookingObject.ownerStreetName = booking.bookingOwner[0].streetName;
          bookingObject.ownerSuburb = booking.bookingOwner[0].suburb;
          bookingObject.ownerState = booking.bookingOwner[0].state;
          bookingObject.ownerPostCode = booking.bookingOwner[0].postCode;
          bookingObject.image = booking.userAssetBookings.image;
          bookingArray.push(bookingObject);
        });

        res.json(bookingArray);
      })
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },

  userBooked: function (req, res) {
    db.User.aggregate([
      // Stage 1
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.userId) },
      },
      // Stage 2
      {
        $lookup: {
          from: "assets",
          localField: "assets",
          foreignField: "_id",
          as: "assetDetails",
        },
      },
      // Stage 3
      {
        $unwind: {
          path: "$assetDetails",
        },
      },
      // Stage 4
      {
        $unwind: {
          path: "$assetDetails.bookings",
        },
      },
      // Stage 5
      {
        $lookup: {
          from: "users",
          localField: "assetDetails.bookings.user_id",
          foreignField: "_id",
          as: "borrowerDetails",
        },
      },
    ])
      .then((response) => {

        let borrowerArray = [];

        response.forEach((booking) => {
          let borrowerObject = booking.assetDetails.bookings;
          borrowerObject.name = booking.assetDetails.name;
          borrowerObject.dailyPrice = booking.assetDetails.dailyPrice;
          borrowerObject.image = booking.assetDetails.image;
          borrowerObject.assetId = booking.assetDetails._id;
          borrowerObject.borrowerFirstName = booking.borrowerDetails[0].firstName;
          borrowerObject.borrowerLastName = booking.borrowerDetails[0].lastName;
          borrowerObject.borrowerEmail = booking.borrowerDetails[0].email;
          borrowerObject.borrowerStreetNum = booking.borrowerDetails[0].streetNum;
          borrowerObject.borrowerStreetName =
            booking.borrowerDetails[0].streetName;
          borrowerObject.borrowerSuburb = booking.borrowerDetails[0].suburb;
          borrowerObject.borrowerState = booking.borrowerDetails[0].state;
          borrowerObject.borrowerPostCode = booking.borrowerDetails[0].postCode;

          borrowerArray.push(borrowerObject);
        });

        res.json(borrowerArray);
      })
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });

    // db.Item.find(req.params, { item: 1, _id: 0 })
    //   .then((response) => res.json(response))
    //   .catch((err) => res.status(422).json(err));
  },

  findItemsNear: function (req, res) {
    let responseArray = [];
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
    ])
      .then((users) => {
        const queryFilter = (asset) => {
          if (asset.name === req.body.item) {
            return asset;
          }
        };

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
        });
        res.json(responseArray);
      })
      .catch((err) => res.status(422).json(err));
  },
};
