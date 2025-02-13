import React from "react";

//Component to display all the categories
const CategoryList = ({ categories, selectedCategory, setSelectedCategory }) => {
    // Sort categories so that "Others" is always at the end
    const sortedCategories = [...categories].sort((a, b) => 
        a.name === "Others" ? 1 : b.name === "Others" ? -1 : 0
    );

    return (
        <div>
            <h2>Categories</h2>
            <div className="category-list">
                <button onClick={() => setSelectedCategory("")} className={selectedCategory === "" ? "active" : ""}>
                    All
                </button>
                {sortedCategories.map((cat) => (
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