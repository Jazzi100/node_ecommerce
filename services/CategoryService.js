const Category = require('../models/Categories');
const mongoose = require('mongoose');

class CategoryService {

    //------------- GET ALL CATEGORIES --------------
    static async getAllCategories() {
        return await Category.find().populate('parentId');
    }

  static async getMainCategories(status) {
    //return await Category.find().populate('parentId');

    console.log("Status : " , status);
     return await Category.find({ parentId: null, status });
  }
  
  
//------------- SAVE CATEGORIES --------------

    //------------- SAVE CATEGORIES --------------
  static async addCategory({ bodyData, file }) {
     console.log("========== SERVICE ==========");
  console.log("BODY DATA:", bodyData);
  console.log("FILE:", file);
  console.log("=============================");
    
    try {
      const { name, parentId } = bodyData;

      if (!name || !name.trim()) {
        throw { statusCode: 400, message: 'Category name is required', errorCode: 'CATEGORY_NAME_REQUIRED' };
    }
        
        const existingCategory = await Category.findOne({ name: name.trim() });
        if (existingCategory) {
            throw { statusCode: 409,  message: 'This category already exists', errorCode: 'CATEGORY_EXISTS' };
        }

      let parentCategory = null;
      if (parentId) {
        if (!mongoose.Types.ObjectId.isValid(parentId)) {
          throw { statusCode: 400, message: 'Invalid parent category ID format', errorCode: 'INVALID_PARENT_ID' };
        }
        parentCategory = await Category.findById(parentId);
        if (!parentCategory) {
          throw { statusCode: 404, message: 'Parent category not found', errorCode: 'PARENT_NOT_FOUND' };
        }
      }

  
      // Get uploaded attachment filenames
      // Single attachment
      const attachments = file
        ? [file.filename]
        : [];


      console.log("Attachment : " , attachments);
      const newCategory = new Category({
        name: name.trim(),
        parentId: parentCategory ? parentCategory._id : null,
        attachment: attachments
      });

      return await newCategory.save();

    } catch (error) {
      // Catch MongoDB native duplicate key error code 11000
      if (error.code === 11000) {
        throw {
          statusCode: 409,
          message: 'This category already exists',
          errorCode: 'CATEGORY_EXISTS',
        };
      }
      throw error; // Pass other custom errors up to the controller
    }
  }
}

module.exports = CategoryService;