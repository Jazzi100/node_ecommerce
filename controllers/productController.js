const Product = require("../models/Product");

const multer = require("multer");

const path = require("path");
var fs = require("fs");

//get all products
const getAllProducts = async (req, res) => {
  try {
    let product = await Product.find().sort({ title: -1 }).populate('catagory_id');
    if(req.session.existingUser){
      res.send({product: product,valid: true});
    }else{
      res.send({valid: false});
    }
    
  } catch (error) {
    console.log("Error caught while getting products: ", error);
    res.send(error.toString()).status(500);
  }
};

//get active products
const activeProducts = async (req, res) => {
  try {
    let product = await Product.find({
      status: 1,
    }).populate("catagory_id");
    res.send(product);
  } catch (error) {
    console.log("Error caught while getting products: ", error);
    res.send(error.toString()).status(500);
  }
};

//get active products
const singleProduct = async (req, res) => {
  try {
    console.log("Req :", req.params.id);
    let product = await Product.findById(req.params.id);
    res.json({ product: product }).status(200);
  } catch (error) {
    res.json({ message: error.toString() }).status(500);
  }
};

const addProduct = async (req, res) => {
  try {
    console.info("Product REQ : ", req.body);
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      catagory_id: req.body.category,
      quantity: req.body.quantity,
      productImage: req.file.path,
    });

    product.save();
    return res.status(200).json({
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.json({ message: error.toString() }).status(500);
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params._id;
  try {
    const result = await Product.findByIdAndRemove(productId);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      return res.status(200).json({ message: "Product delete successfully" });
    }
  } catch (error) {
    console.log("Error caught while delete product: ", error);
    return res.send(error.toString()).status(500);
  }
};

const adminAddProduct = async (req, res) => {
  
  console.log("Admin Add Product : ");
  
};

module.exports = {
  getAllProducts,
  activeProducts,
  singleProduct,
  addProduct,
  deleteProduct,
  adminAddProduct,
};
