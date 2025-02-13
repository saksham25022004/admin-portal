const express = require("express");
const multer = require("multer");
const { findCategory, allProducts, addProduct } = require("../Controllers/Product");

const router = express.Router();

//Store the image of the product in the uploads folder in the format eg.(17395145151-Name.png)
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

//Creates a Multer instance that follows the storage settings.
const upload = multer({ storage });

router.post("/", upload.single("image"), addProduct); //Add new product
router.get("/AllProducts", allProducts); //get all product
router.get("/:categoryName", findCategory); //get only those product which is related to the given category

module.exports = router;