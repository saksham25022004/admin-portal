const mongoose = require('mongoose');
require('dotenv').config();

//Add database to the server
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/adminPortal', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB Connected!");
    } 
    catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;