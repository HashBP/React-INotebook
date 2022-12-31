const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Name is required."],
  },
  email: {
    type: String,
    required: true,
    unique: [true,"Email is required."],
  },
  password: {
    type: String,
    required: [true,"Password is required."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
