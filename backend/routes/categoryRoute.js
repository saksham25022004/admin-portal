const express = require("express");
const { fetchCategories, addCategory } = require("../Controllers/Category");
const router = express.Router();

// Get all categories
router.get("/", fetchCategories);
router.post("/addCategory", addCategory); 

module.exports = router;