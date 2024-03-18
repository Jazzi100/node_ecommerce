const express = require("express");

const upload = require("../middleware/multer");
const router = express.Router();

const { getCart } = require("../controllers/cartController");

const { addCart } = require("../controllers/cartController");

const { deleteCartItem } = require("../controllers/cartController");

router.get("/get-cart", getCart);

router.post("/add-cart", addCart);

router.delete("/:id", deleteCartItem);

module.exports = router;
