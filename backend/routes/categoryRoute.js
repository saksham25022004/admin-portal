const express = require("express");
const { fetchCategories, addCategory } = require("../Controllers/Category");
const router = express.Router();

router.get("/", fetchCategories); //get all categories
router.post("/addCategory", addCategory); //add the category

module.exports = router;