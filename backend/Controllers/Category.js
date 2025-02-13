const Category = require("../models/Category");

//Fetch all the categories from the database
const fetchCategories= async (req, res) => {
    try {
        //get all the category
        const categories = await Category.find();
        res.json(categories);
    } 
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//Add new category in the database
const addCategory =async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Category name is required" });

        const existingCategory = await Category.findOne({ name });

        //if category already exist in the database it will directly return
        if (existingCategory) return res.status(400).json({ error: "Category already exists" });

        //if category is not present it will create the new one
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } 
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports= {addCategory, fetchCategories};