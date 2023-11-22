const Category = require("../models/Categories");

//get active categories
const getAllCategories = async (req, res) => {
  try {
    let category = await Category.find().sort({ title: 1 });
    res.send(category).status(200);
  } catch (error) {
 
    console.error("Error caught while Category get in: ", error);
    res.status(500).json({ message: error });
  }
};

module.exports = { getAllCategories };
