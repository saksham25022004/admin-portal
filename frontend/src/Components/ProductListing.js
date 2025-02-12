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

    // Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/categories");
                setCategories(res.data);
            } 
            catch (error) {
                setError("Error fetching categories");
            }
        };
        fetchCategories();
    }, []);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
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
        <div className="container">
            {error && <p className="error-text">{error}</p>}

            <h1>Admin Portal</h1>

            <ProductForm setProducts={setProducts} setSelectedCategory={setSelectedCategory}/>

            <CategoryList categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

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