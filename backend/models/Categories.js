const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  status: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("categories", categorySchema);
