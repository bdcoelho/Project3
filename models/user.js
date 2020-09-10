const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First name is required"
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: "please enter a valid email",
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: "please enter a unique password"
  },
  streetNum: {
    type: String,
    required: "please enter your street number"
  },
  streetName: {
    type: String,
    required: "please enter your street name"
  },
  suburb: {
    type: String,
    required: "please enter your suburb"
  },
  state: {
    type: String,
    required: "please enter your state"
  },

  userCreated: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
