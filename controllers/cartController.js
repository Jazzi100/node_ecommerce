const Cart = require("../models/CartModel");

// ----- add to cart start -----
const addCart = async (req, res) => {

  try {
    let singleCart = await Cart.find({
      product_id: req.body.p_id,
    });
    console.log("product already hy : " , singleCart);
    if (singleCart.length > 0) {
      try {
        let result = await Cart.updateOne(
          { product_id: req.body.p_id },
          { $set: { quantity: req.body.qty } }
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
    // res.json({ data: cart});
    // res.send(cart).status(200);
    res.status(200).json({ cart: cart });
  } catch (error) {
    console.log("Error caught while getting products : ", error);
    res.send(error.toString()).status(500);
  }
};

// ----- delete cart item start -----
const deleteCartItem = async (req, res) => {
  console.log("Req :", req.params.id);
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Invalid request. ID is missing.' });
    }
    const deletedCartItem = await Cart.findByIdAndDelete(id);
    if (!deletedCartItem) {
      return res.status(404).json({ error: 'Cart item not found.' });
    }
    res.status(200).json({ message: `Cart item has been deleted successfully` });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: 'An error occurred while deleting the cart item' });
  }
}


module.exports = { addCart, getCart, deleteCartItem };
