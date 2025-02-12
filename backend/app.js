const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DB");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));