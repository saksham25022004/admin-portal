const Product = require("../models/Product");
const Category = require("../models/Category");
const classifyProduct = require("../services/gemini");

// Add a new product
const addProduct= async (req, res) => {
    try {
        const { title, description } = req.body;
        const imagePath = req.file.path;

        const response = await classifyProduct(title, description, imagePath);

        const newProduct = new Product({ title, description, image:imagePath, category:response });
        await newProduct.save();

        let category = await Category.findOne({ name: response });

        if (!category) {
            return res.json({ message: "Category not found"});
        }

        category.products.push(newProduct._id);
        await category.save();

        res.json({ message: "Product added successfully", product: newProduct });
    } 
    catch (error) {
        res.status(500).json({ error });
    }
};

//get all products
const allProducts= async(req, res) =>{
    try{
        const product = await Product.find();
        res.json(product);
    }
    catch(error){
        res.status(500).json({message: "server error"});
    }
};

//find by category
const findCategory= async (req, res) => {
    try {
        const {categoryName} = req.params;
        
        const category = await Category.findOne({ name: categoryName }).populate("products");

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category.products);
    } 
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports= {addProduct, allProducts, findCategory};