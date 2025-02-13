const Product = require("../models/Product");
const Category = require("../models/Category");
const classifyProduct = require("../services/gemini");

// Add a new product
const addProduct= async (req, res) => {
    try {
        const { title, description } = req.body;
        const imagePath = req.file.path;

        //it return the name of the category predicted by the gemini api
        const response = await classifyProduct(title, description, imagePath);

        //save the nen product in the database
        const newProduct = new Product({ title, description, image:imagePath, category:response });
        await newProduct.save();

        //find the given category in the database
        let category = await Category.findOne({ name: response });

        //if category not found return category not found
        if (!category) {
            return res.json({ message: "Category not found"});
        }

        //save the product id to there repective category eg.(electronic:television)
        category.products.push(newProduct._id);
        await category.save();

        //if product add successfully it will return the product
        res.json({ message: "Product added successfully", product: newProduct });
    } 
    catch (error) {
        res.status(500).json({ error });
    }
};

//get all products
const allProducts= async(req, res) =>{
    try{
        //find all the product
        const product = await Product.find();
        res.json(product);
    }
    catch(error){
        res.status(500).json({message: "server error"});
    }
};

//find by category and fetch all the product related to the category
const findCategory= async (req, res) => {
    try {
        const {categoryName} = req.params;
        
        //find the given name of the category and fetch their respective products
        const category = await Category.findOne({ name: categoryName }).populate("products");

        //if category not found it return category not found
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