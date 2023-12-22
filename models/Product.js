const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  catagory_id: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  quantity: {
    type: Number,
  },
  status: {
    type: Number,
    default: 1,
  },
  productImage: String,
});

module.exports = mongoose.model("products", productSchema);
