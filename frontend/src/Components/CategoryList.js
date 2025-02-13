import React from "react";

//Component to display all the categories
const CategoryList = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div>
            <h2>Categories</h2>
            <div className="category-list">
                <button onClick={() => setSelectedCategory("")} className={selectedCategory === "" ? "active" : ""}>
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat._id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={selectedCategory === cat.name ? "active" : ""}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;