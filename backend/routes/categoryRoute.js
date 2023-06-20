const express = require("express");

const router = express.Router();

const multer = require("multer");

const { getAllCategories } = require("../controllers/categoryController");

router.get("/get-all-categories", getAllCategories);

module.exports = router;
