const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  name: {
    type: Number,
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
  user_id: {
    type: String,
    trim: true
  }
});

const Asset = mongoose.model("Asset", AssetSchema);
console.log("made it here");
module.exports = Asset;
