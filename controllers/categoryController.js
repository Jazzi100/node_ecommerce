const Category = require("../models/Categories");

// Get active categories
const getAllCategories = async (req, res) => {
  try {
    let category = await Category.find().sort({ title: 1 });
    res.send(category).status(200);
  } catch (error) {
 
    console.error("Error caught while Category get in: ", error);
    res.status(500).json({ message: error });
  }
};

// Add active categories
const addCategory = async (req, res) => {
  try {
    const categoryName = await Category.findOne({ name: req.body.name });
    if(categoryName){
      return res.status(500).json({ message: 'This category is already exist', status: 500 });
    }
    const { name, parentId } = req.body;

    let parentCategory = null;
    
    // Check if parentId is provided and exists
    if (parentId) {
      parentCategory = await Category.findById(parentId);
      if (!parentCategory) {
        return res.status(404).json({ message: 'Parent category not found' });
      }
    }

    const newCategory = new Category({
      name: name,
      parent: parentCategory
    });

    const savedCategory = await newCategory.save();
    res.status(200).json({ message: 'category created successfully', data : savedCategory , status : 200 });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Internal Server Error' , status : 500});
  }
};

module.exports = { getAllCategories, addCategory };
