const express = require("express");
const multer = require("multer");
const { findCategory, allProducts, addProduct } = require("../Controllers/Product");

const router = express.Router();

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
const upload = multer({ storage });

// Add a new product
router.post("/", upload.single("image"), addProduct);
router.get("/AllProducts", allProducts);
router.get("/:categoryName", findCategory);

module.exports = router;