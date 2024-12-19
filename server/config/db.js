require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;


const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI); //mongodb+srv://${id}:${password}@cluster0.55gey.mongodb.net/${db}?retryWrites=true&w=majority
    } catch (error) {
        console.log("Connection error:", error);
    }
};

module.exports = connectDb;