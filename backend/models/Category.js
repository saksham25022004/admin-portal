const mongoose = require("mongoose");
const Product = require("../models/Product");

//Schema of Category
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, //Name the Category
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], //Add product id in their respective category
});

module.exports = mongoose.model("Category", categorySchema);