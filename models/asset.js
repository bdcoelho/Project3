const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  hourlyPrice: {
    type: Number,
    trim: true
  },
  dailyPrice: {
    type: Number,
    trim: true
  },
  dailyPrice: {
    type: String,
    trim: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    trim: true
  },
  image:{
    type: String,
    trim: true
  },

  bookings:[{
    user_id: Schema.Types.ObjectId,
    startDate : Date,
    endDate : Date
     }]


});

const Asset = mongoose.model("Asset", AssetSchema);
module.exports = Asset;
