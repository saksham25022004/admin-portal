const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DB");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const path = require("path");
require("dotenv").config();

const app = express();

//Cors allow frontend to use the api of the backend
app.use(cors());
app.use(express.json());

//This constructs the absolute path to the uploads folder
//If a file named image.png is stored in the uploads folder (uploads/image.png)
//it will be accessible in the browser at http//localhost:3000/uploads/image.png
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Connect the Database
connectDB();

app.use("/api/categories", categoryRoute); //Api for the categories routes
app.use("/api/products", productRoute); //Api for the products routes

//Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));