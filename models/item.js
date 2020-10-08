const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  }
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
