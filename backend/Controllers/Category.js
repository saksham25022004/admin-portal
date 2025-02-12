const Category = require("../models/Category");

const fetchCategories= async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } 
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const addCategory =async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Category name is required" });

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) return res.status(400).json({ error: "Category already exists" });

        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports= {addCategory, fetchCategories};