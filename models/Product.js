const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  sku: String,
  catagory_id: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  brand: String,
  description: String,
  price: Number,
  discountPrice: Number,
  quantity: {
    type: Number,
  },
  lowQuantityAlert: {
    type: Number,
  },
  productImages: {
    type: [String],
    default: [],
  },
  status: {
    type: Number,
    default: 1,
  },
  tag: {
    type: [String],
  },
  isFeatured: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("products", productSchema);
