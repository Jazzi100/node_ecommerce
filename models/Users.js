const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  roleType: {
    type: Number,
    default: 0,
  },
  profilePicture: {
    type: String,
  },
});


module.exports = mongoose.model("users", userSchema);
