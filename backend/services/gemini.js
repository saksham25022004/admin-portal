const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require("dotenv").config();

const GEMINI_API_KEY='AIzaSyBO1XXS68R7HrRLOvQKwePDJBU7MePyJeU'

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function classifyProduct(title, description, imagePath) {

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt =  `Classify this product into one of the predefined categories. If the product does not clearly fit into any of the given categories, return "Others":  
  - Title: ${title}  
  - Description: ${description}  

  Categories: Electronics, Clothing, Home Decor, Books, Toys, Grocery, Others
  Return only the category name`;

  const imageType = imagePath.endsWith(".png") ? "image/png" : "image/jpeg";
  const imagePart = fileToGenerativePart(imagePath, imageType);

  const generatedContent = await model.generateContent([prompt, imagePart]);

  const responseText = generatedContent.response.text().trim();
  return responseText;
}

module.exports = classifyProduct;