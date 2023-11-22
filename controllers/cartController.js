const Cart = require("../models/CartModel");

// ----- add to cart start -----
const addCart = async (req, res) => {
  console.log("Request from frontend : " + req.body);
  try {
    let singleCart = await Cart.find({
      product_id: req.body.p_id,
    });
    if (singleCart.length > 0) {
      try {
        let result = await Cart.updateOne(
          { product_id: req.body.p_id },
          {
            $set: { quantity: req.body.qty },
          }
        );
        res.json({ message: "quantity updated successfully" });
      } catch (error) {
        res.status(500).json({ message: error.toString() });
      }
    } else {
      try {
        const cart = new Cart({
          product_id: req.body.p_id,
          quantity: req.body.qty,
        });
        cart.save().then(() => {
          res.json({ message: "cart added successfully" });
        });
      } catch (error) {
        res.status(500).json({ message: error.toString() });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
// ----- add to cart end -----

const getCart = async (req, res) => {
  try {
    let cart = await Cart.find().populate("product_id");
    res.send(cart);
  } catch (error) {
    console.log("Error caught while getting products: ", error);
    res.send(error.toString()).status(500);
  }
};

module.exports = { addCart, getCart };
