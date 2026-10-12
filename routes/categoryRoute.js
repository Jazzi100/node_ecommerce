const express = require("express");

const router = express.Router();

const multer = require("multer");

const { uploadSingleFile } = require("../middleware/fileUploadMiddleware");

const { getAllCategories, addCategory, getMainCategories} = require("../controllers/categoryController");


router.get("/get-all-categories", getAllCategories);

router.get("/get-main-categories", getMainCategories);

// router.post("/add-category", uploadSingleFile("category", "attachment"), addCategory);

router.post(
  "/add-category",
  uploadSingleFile("category", "attachment"),
  (req, res, next) => {
    next();
  },
  addCategory
);

module.exports = router;
