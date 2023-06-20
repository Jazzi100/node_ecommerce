const Category = require("../models/Categories");

//get active categories
const getAllCategories = async (req, res) => {
  console.log("working");
  try {
    let category = await Category.find().sort({ title: 1 });
    res.send(category).status(200);
  } catch (error) {
    console.log("Error caught while getting categories: ", error);
    res.send(error.toString()).status(500);
  }
};

module.exports = { getAllCategories };
