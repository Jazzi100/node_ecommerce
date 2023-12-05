const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema({
//   name: String,
//   status: {
//     type: Number,
//     default: 1,
//   },
// });

const categorySchema = new mongoose.Schema({
  name: String,
  status: {
    type: Number,
    default: 1,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    default: null,
  },
});

module.exports = mongoose.model("categories", categorySchema);
