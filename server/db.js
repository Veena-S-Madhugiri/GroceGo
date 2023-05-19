// Loads environment variables from a .env file
require('dotenv').config();

// DB Connection File
const mongoose = require('mongoose');

// Connection URL for the MongoDB database
const connectionUrl = 'mongodb://127.0.0.1:27017/groceries?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';

// Function to connect to the MongoDB database
async function connectToMongo() {
  try {
    // Connect to the MongoDB database using the connection URL and specified options
    const conn = await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

// Export the function for use in other files
module.exports = connectToMongo;
