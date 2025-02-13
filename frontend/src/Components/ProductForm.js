import React, { useState } from "react";
import axios from "axios";

//component to add product in there respective category
const ProductForm = ({ setProducts, setSelectedCategory }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    //Function to add product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        //if the image are not png or jpeg format the it will show error
        if (image && !["image/png", "image/jpeg"].includes(image.type)) {
            setError("Only PNG and JPEG images are allowed.");
            setLoading(false);
            return;
        }

        //Object which store details of the product
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (image) formData.append("image", image);

        try {
            //api to post the product
            const res = await axios.post("http://localhost:5000/api/products", formData);
            setProducts((prevProducts) => [...prevProducts, res.data.product]);
            setSuccess(res.data.product.category);
            setSelectedCategory(res.data.product.category);
            setTitle("");
            setDescription("");
            setImage(null);
        } catch (error) {
            setError("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    return (
        //component to display the add product form
        <div>
            <h2>Add Product</h2>

            {/*If there is any error it will show here*/}
            {error && <p className="error-text">{error}</p>}

            {/*If the product add successfully in the database it will show here */}
            {success && <p className="success-text">Product Add successfully in Category: {success}</p>}

            {/*Form to add product*/}
            <form onSubmit={handleSubmit} className="product-form">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;