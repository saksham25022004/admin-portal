import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryList from "./CategoryList";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import "./ProductListing.css";

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState("");

    // Fetch all the Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                //It will fetch all the categories
                const res = await axios.get("http://localhost:5000/api/categories");
                setCategories(res.data);
            } 
            catch (error) {
                setError("Error fetching categories");
            }
        };
        fetchCategories();
    }, []);

    // Fetch all the Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                //if the category is all it will fetch all the product
                //if the category is specific the it will fetch only the related product of the category
                let url = selectedCategory
                    ? `http://localhost:5000/api/products/${selectedCategory}`
                    : `http://localhost:5000/api/products/AllProducts`;

                const res = await axios.get(url);
                setProducts(res.data);
            } 
            catch (error) {
                setError("Error fetching products");
            }
        };
        fetchProducts();
    }, [selectedCategory]);

    return (
        //Admin portal
        <div className="container">
            {error && <p className="error-text">{error}</p>}

            <h1>Admin Portal</h1>

            {/*Display the form for add product in the database */}
            <ProductForm setProducts={setProducts} setSelectedCategory={setSelectedCategory}/>

            {/*Display all the categories*/}
            <CategoryList categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

            {/*Display all the products */}
            <h2>Products</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => <ProductCard key={product._id} product={product} />)
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default ProductListing;