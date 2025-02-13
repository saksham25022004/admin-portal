# Admin Portal with Gemini AI Integration
This project is an Admin Portal that allows users to add products with a title, description, and image. It integrates Gemini AI to automatically classify products into predefined categories before saving them to the database.

## Features
- Add Products – Users can add new products with a title, description, and image.
- Predefined Categories – Categories are stored in the database and used for classification.
- Gemini AI Integration – AI analyzes the product details and assigns the most appropriate category automatically.
- Database Storage – Product data is saved in a MongoDB database.

## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- AI Integration: Gemini AI API

## How Gemini AI Works in This Project
- Receives product title, image, and description from the user.
- Sends the data to Gemini AI to classify the product based on predefined categories.
- AI predicts the best category and assigns it before saving to the database.

## Installation & Setup
1. Clone the Repository
```bash
git clone https://github.com/saksham25022004/admin-portal.git
```
2. Backend Setup

- Navigate to the backend directory:
```bash
cd backend
```
- Install dependencies:
```bash
npm install
```
- Configure environment variables (.env file):
```bash
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```
- Start the backend server:
```bash
npm start
```
3. Frontend Setup

- Navigate to the frontend directory:
```bash
cd frontend
```
- Install dependencies:
```bash
npm install
```
- Start the frontend application:
```bash
npm start
```