const CategoryService = require('../services/CategoryService');
const ResponseHandler = require('../utils/ResponseHandler');

// =================== ADD CATEGORY ========================

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return ResponseHandler.success(res, 'Categories fetched successfully', categories, 200);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ResponseHandler.error(
      res, 
      error.message || 'Internal Server Error', 
      error.statusCode || 500, 
      error.errorCode || 'SERVER_ERROR'
    );
  }
};

// =================== ADD CATEGORY ========================

const getMainCategories = async (req, res) => {
  try {
    console.log(req.query.status);
    const { status } = req.query;
    const categories = await CategoryService.getMainCategories(status);
    return ResponseHandler.success(res, 'Parent categories fetched successfully', categories, 200);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ResponseHandler.error(res, error.message, error.statusCode, error.errorCode);
  }
};

// =================== ADD CATEGORY ========================
const addCategory = async (req, res) => {
  try {
    //const savedCategory = await CategoryService.addCategory(req.body, req.file);
    const savedCategory = await CategoryService.addCategory({
      bodyData: req.body,
      file: req.file
    });
    return ResponseHandler.success(res, 'Category created successfully', savedCategory, 201);
  } catch (error) {
    console.error('Error adding category:', error);
    return ResponseHandler.error(res, error.message, error.statusCode, error.errorCode);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  getMainCategories
};