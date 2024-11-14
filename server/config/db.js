require('dotenv').config();
const mongoose = require('mongoose');

const password = process.env.DB_PASSWORD;
const id = process.env.DB_ID;
const db = process.env.DB_NAME;

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${id}:${password}@cluster0.55gey.mongodb.net/${db}?retryWrites=true&w=majority`);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Connection error:", error);
    }
};

module.exports = connectDb;