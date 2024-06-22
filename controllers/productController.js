const Product = require("../models/Product");

const multer = require("multer");

const path = require("path");
var fs = require("fs");

//get all products
const getAllProducts = async (req, res) => {
  try {
    const { categoryId, status } = req.query;
    
    let query = {};

    if (status) {
      query.status = status;
    }

    if (categoryId) {
      query.catagory_id = categoryId;
    }

    // Find products by the constructed query and populate the category
    let products = await Product.find(query).populate('catagory_id');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error caught while getting products:', error);
    res.status(500).json({ message: error.toString() });
  }
};

//get active products
const activeProducts = async (req, res) => {
  try {
    const categoryId = req.query.categoryId 
    const status = req.query.status
    const query = {};
    // if(categoryId) query.catagory_id = categoryId;
    // if(status) query.status = status;
    // if (categoryId == undefined || categoryId == null) return res.json({message:'no category found. select valid category'}).status(404)
    if(  categoryId != null && categoryId != 'All') query.catagory_id = categoryId;
    if(status) query.status = status;
    console.log('Queryyyy :', query);
    let product = await Product.find(query).populate("catagory_id");
    
    return res.send(product);
  } catch (error) {
    console.log("Error caught while getting products: ", error);
    res.send(error.toString()).status(500);
  }
};




//get active products
const singleProduct = async (req, res) => {
  try {
    console.log("Reqsss :", req.query.id);
    let product = await Product.findById(req.query.id);
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


const allProduct = async (req, res) => {
  try {
    const { categoryId, status } = req.query;
    let query = {};
    if (status) {
      query.status = status;
    }
    if (categoryId) {
      query.catagory_id = categoryId;
    }

    // Find products by the constructed query and populate the category
    let products = await Product.find(query).populate('catagory_id');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error caught while getting products:', error);
    res.status(500).json({ message: error.toString() });
  }
};


module.exports = {
  getAllProducts,
  activeProducts,
  singleProduct,
  addProduct,
  deleteProduct,
  adminAddProduct,
  allProduct,
};
