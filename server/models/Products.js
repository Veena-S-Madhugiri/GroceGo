// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Product collection
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Exporting the Product model, which will be used to interact with the Product collection in the database
module.exports = mongoose.model("Product", productSchema);
