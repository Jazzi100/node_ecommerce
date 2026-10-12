const mongoose = require("mongoose");
const moment = require("moment");
const date = new Date(); // Your date object
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
const cartSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  quantity: Number,
  status: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    default: formattedDate,
  },
  updated_at: {
    type: Date,
    default: formattedDate,
  },
});

module.exports = mongoose.model("cart", cartSchema);
