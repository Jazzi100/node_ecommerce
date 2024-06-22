const express = require("express");

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const {
  getAllProducts,
  activeProducts,
  singleProduct,
  addProduct,
  deleteProduct,
  allProduct,
} = require("../controllers/productController");

router.get("/get-all-products", getAllProducts);

router.get("/get-active-products", activeProducts);

router.get("/single-product", singleProduct);

router.post("/add-product", upload.single("productImage"), addProduct);

router.delete("/delete/:_id", deleteProduct);

router.get("/all-products", allProduct);

module.exports = router;
