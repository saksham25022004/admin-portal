const mongoose = require("mongoose");

//Schema of product
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },//title of the product
    description: { type: String, required: true },//description of the product
    image: { type: String, required: true },//image of the product
    category: { type: String, required: true }//category of the product 
});

module.exports = mongoose.model("Product", productSchema);