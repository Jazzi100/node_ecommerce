const express = require("express");

const router = express.Router();

const multer = require("multer");

const { getAllCategories, addCategory } = require("../controllers/categoryController");

router.get("/get-all-categories", getAllCategories);

router.post("/add-category", addCategory);

module.exports = router;
